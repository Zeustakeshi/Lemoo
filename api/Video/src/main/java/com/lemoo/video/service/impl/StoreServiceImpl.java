/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 12:24 AM
 * */


package com.lemoo.video.service.impl;

import com.lemoo.video.client.StoreClient;
import com.lemoo.video.dto.request.VerifyStoreRequest;
import com.lemoo.video.dto.response.StoreInfoResponse;
import com.lemoo.video.exception.ForbiddenException;
import com.lemoo.video.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RBucket;
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreClient storeClient;
    private final RedissonClient redisson;


    @Override
    public StoreInfoResponse getStoreInfo(String accountId) {
        RMap<String, String> rMap = redisson.getMap(generateAccountStoreInfoKey(accountId));
        if (rMap.isExists()) {
            Map<String, String> storeInfoMap = rMap.readAllMap();
            return StoreInfoResponse.builder()
                    .id(storeInfoMap.get("id"))
                    .name(storeInfoMap.get("name"))
                    .logo(storeInfoMap.get("logo"))
                    .shortCode(storeInfoMap.get("shortCode"))
                    .build();
        } else {
            StoreInfoResponse storeInfoResponse = storeClient.getStoreInfo(accountId).getData();
            saveStoreInfoToCacheAsync(accountId, storeInfoResponse);
            return storeInfoResponse;
        }
    }

    @Override
    public void verifyStore(String accountId, String storeId) {
        RBucket<String> bucket = redisson.getBucket(generateStoreOwnerVerifyKey(storeId));
        String ownerId = bucket.get();
        if (ownerId != null && ownerId.equals(accountId)) return;
        boolean isStoreOwner = storeClient.verifyStore(new VerifyStoreRequest(accountId, storeId)).getData();
        if (!isStoreOwner) throw new ForbiddenException("Only store owner can be modify product");
        saveStoreOwnerToCacheAsync(accountId, storeId);
    }

    @Async
    protected void saveStoreOwnerToCacheAsync(String accountId, String storeId) {
        String key = generateStoreOwnerVerifyKey(storeId);
        RBucket<String> bucket = redisson.getBucket(key);
        try {
            bucket.set(accountId, Duration.ofMinutes(30));
        } catch (Exception ex) {
            throw new RuntimeException("Save store verify to cache failed with key: " + key);
        }
    }

    @Async
    protected void saveStoreInfoToCacheAsync(String accountId, StoreInfoResponse store) {
        String key = generateAccountStoreInfoKey(accountId);
        Map<String, String> storeInfoMap = Map.of(
                "id", store.getId(),
                "name", store.getName(),
                "logo", store.getLogo(),
                "shortCode", store.getShortCode()
        );
        try {
            RMap<String, String> rMap = redisson.getMap(key);
            rMap.putAll(storeInfoMap);
            rMap.expireAsync(Duration.ofDays(7));
        } catch (Exception ex) {
            throw new RuntimeException("Save account store info to cache failed with key: " + key);
        }
    }

    private String generateStoreOwnerVerifyKey(String storeId) {
        return "store:" + storeId + ":owner";
    }

    private String generateAccountStoreInfoKey(String accountId) {
        return "account:" + accountId + ":store";
    }

}
