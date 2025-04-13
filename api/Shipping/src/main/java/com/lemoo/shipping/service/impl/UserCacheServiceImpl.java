/*
 *  UserCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 2/7/2025 6:52 PM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.dto.common.UserHash;
import com.lemoo.shipping.mapper.UserMapper;
import com.lemoo.shipping.service.UserCacheService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserCacheServiceImpl implements UserCacheService {
    private final RedissonClient redisson;
    private final UserMapper userMapper;

    @Override
    @Async
    public void saveUser(UserHash user) {
        RMap<String, String> redissonMap = redisson.getMap(getUserInfoKey(user.getId()));
        var userMap = userMapper.toUserMap(user);
        redissonMap.putAll(userMap);
        redissonMap.expire(Duration.ofMinutes(30));
    }

    @Override
    public Optional<UserHash> getUser(String userId) {
        String key = getUserInfoKey(userId);
        RMap<String, String> rMap = redisson.getMap(key);
        if (rMap.isEmpty()) return Optional.empty();

        var userMap = rMap.getAll(Set.of("id", "name", "avatar"));
        return Optional.of(userMapper.toUserHash(userMap));
    }

    private String getUserInfoKey(String userId) {
        return "user:" + userId;
    }
}
