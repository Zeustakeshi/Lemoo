/*
 *  UserCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 12/24/2024 12:51 AM
 * */

package com.lemoo.video.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemoo.video.client.UserClient;
import com.lemoo.video.dto.response.UserResponse;
import com.lemoo.video.service.UserCacheService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.redisson.api.RBucket;
import org.redisson.api.RedissonClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UserCacheServiceImpl implements UserCacheService {
    private static final Logger log = LoggerFactory.getLogger(UserCacheServiceImpl.class);
    private final UserClient userClient;
    private final RedissonClient redisson;
    private final ObjectMapper objectMapper;

    @Override
    @SneakyThrows
    public UserResponse finUserById(String userId) {
        RBucket<String> rBucket = redisson.getBucket(generateUserCacheKey(userId));
        String cacheData = rBucket.get();
        UserResponse user;
        if (cacheData != null) {
            user = objectMapper.readValue(cacheData, UserResponse.class);
        } else {
            user = userClient.getUserInfo(userId).getData();
            saveUserToCacheAsync(user);
        }
        return user;
    }

    @Async
    protected void saveUserToCacheAsync(UserResponse user) {
        try {
            RBucket<String> rBucket = redisson.getBucket(generateUserCacheKey(user.getId()));
            String userJson = objectMapper.writeValueAsString(user);
            rBucket.set(userJson, Duration.ofMinutes(5));
        } catch (Exception ex) {
            log.error("saveUserToCacheAsync failed message: {}", ex.getMessage());
        }
    }


    private String generateUserCacheKey(String userId) {
        return "user:" + userId;
    }

}
