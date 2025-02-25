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
import org.redisson.api.RBucket;
import org.redisson.api.RSet;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreClient storeClient;
    private final RedissonClient redisson;

    @Override
    public boolean isFollowedStore(String userId, String storeId) {
        RSet<String> storeFollowers = redisson.getSet(generateStoreFollowerKey(userId));
        if (storeFollowers.isExists()) {
            return storeFollowers.readAll().contains(userId);
        }
        Set<String> followers = storeClient.getStoreFollowers(storeId).getData();

        storeFollowers.addAll(followers);
        storeFollowers.expire(Duration.ofMinutes(30));

        return followers.contains(userId);
    }

    @Override
    public void verifyStore(String accountId, String storeId) {
        RBucket<String> storeOwner = redisson.getBucket(generateStoreOwnerVerifyKey(storeId));
        if (storeOwner.isExists() && storeOwner.get().equals(accountId)) return;
        boolean isStoreOwner = storeClient.verifyStore(new VerifyStoreRequest(accountId, storeId)).getData();
        if (!isStoreOwner) throw new ForbiddenException("Can't access this store");
        saveStoreOwnerToCacheAsync(accountId, storeId);
    }


    @Async
    protected void saveStoreOwnerToCacheAsync(String accountId, String storeId) {
        String key = generateStoreOwnerVerifyKey(storeId);
        try {
            RBucket<String> storeOwner = redisson.getBucket(key);
            storeOwner.set(accountId, Duration.ofMinutes(30));
        } catch (Exception ex) {
            throw new RuntimeException("Save store verify to cache failed with key: " + key);
        }
    }

    private String generateStoreOwnerVerifyKey(String storeId) {
        return "store:" + storeId + ":owner";
    }

    private String generateStoreFollowerKey(String storeId) {
        return "store:" + storeId + ":followers";
    }
}
