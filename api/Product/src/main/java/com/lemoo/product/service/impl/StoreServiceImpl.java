/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 12:24 AM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.client.StoreClient;
import com.lemoo.product.dto.request.VerifyStoreRequest;
import com.lemoo.product.exception.ForbiddenException;
import com.lemoo.product.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RBucket;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreClient storeClient;
    private final RedissonClient redisson;

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

    private String generateStoreOwnerVerifyKey(String storeId) {
        return "store:" + storeId + ":owner";
    }
}
