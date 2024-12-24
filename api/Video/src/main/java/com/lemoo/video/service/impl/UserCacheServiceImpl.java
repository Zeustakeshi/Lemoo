/*
 *  UserCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 12/24/2024 12:51 AM
 * */


package com.lemoo.video.service.impl;

import com.lemoo.video.client.UserClient;
import com.lemoo.video.dto.response.UserResponse;
import com.lemoo.video.service.UserCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserCacheServiceImpl implements UserCacheService {
    private final UserClient userClient;
    private final Jedis jedis;

    @Override
    public UserResponse finUserById(String userId) {

        // find user from cache
        var userOptional = getUserFromCache(userId);

        // if user exist return user
        if (userOptional.isPresent()) return userOptional.get();

        // call api get user info and save to cache
        UserResponse user = userClient.getUserInfo(userId).getData();

        System.out.println(user);

        saveUserToCache(user);

        return user;
    }

    private void saveUserToCache(UserResponse user) {
        String userKey = "user:" + user.getId();
        jedis.hmset(userKey, Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "avatar", user.getAvatar()
        ));
        // TODO: add expire time for user data
    }

    private Optional<UserResponse> getUserFromCache(String userId) {
        String userKey = "user:" + userId;

        List<String> userData = jedis.hmget(userKey, "id", "username", "avatar");

        if (userData == null || userData.isEmpty() || userData.get(1) == null) return Optional.empty();

        String id = userData.get(0);
        String username = userData.get(1);
        String avatar = userData.get(2);

        return Optional.of(new UserResponse(id, username, avatar));

    }
}
