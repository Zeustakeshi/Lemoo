/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 12:24 AM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.client.StoreClient;
import com.lemoo.promotion.dto.request.VerifyStoreRequest;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreClient storeClient;
    private final Jedis jedis;

    @Override
    public void verifyStore(String accountId, String storeId) {
        if (jedis.exists(generateStoreOwnerVerifyKey(storeId))) return;
        boolean isStoreOwner = storeClient.verifyStore(new VerifyStoreRequest(accountId, storeId)).getData();
        if (!isStoreOwner) throw new ForbiddenException("Can't access this store");
        saveStoreOwnerToCacheAsync(accountId, storeId);
    }


    @Async
    protected void saveStoreOwnerToCacheAsync(String accountId, String storeId) {
        String key = generateStoreOwnerVerifyKey(storeId);
        try {
            long ttl = Duration.ofMinutes(30).toSeconds();
            jedis.setex(key, ttl, accountId);
        } catch (Exception ex) {
            throw new RuntimeException("Save store verify to cache failed with key: " + key);
        }
    }

    private String generateStoreOwnerVerifyKey(String storeId) {
        return "store:" + storeId + ":owner";
    }
}
