/*
 *  UserServiceImpl
 *  @author: Minhhieuano
 *  @created 2/7/2025 11:07 PM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.client.UserClient;
import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.dto.response.UserResponse;
import com.lemoo.shipping.mapper.UserMapper;
import com.lemoo.shipping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserClient userClient;
    //    private final UserCacheService userCacheService;
    private final UserMapper userMapper;

    @Override
    public Optional<UserResponse> getUserInfo(String userId) {

//        Optional<UserHash> userHashOptional = userCacheService.getUser(userId);
//
//        if (userHashOptional.isPresent()) {
//            UserHash userHash = userHashOptional.get();
//            return Optional.of(userMapper.toUser(userHash));
//        }

        ApiResponse<UserResponse> apiResponse = userClient.getUserInfo(userId);
//        if (apiResponse.getErrors() != null) return Optional.empty();

        UserResponse user = apiResponse.getData();

//        userCacheService.saveUser(userMapper.toUserHash(user));

        return Optional.of(user);
    }
}
