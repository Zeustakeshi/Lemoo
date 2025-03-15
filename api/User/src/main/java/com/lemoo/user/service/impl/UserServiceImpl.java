/*
 *  UserServiceImpl
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:30 PM
 * */

package com.lemoo.user.service.impl;

import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.User;
import com.lemoo.user.exception.NotfoundException;
import com.lemoo.user.mapper.UserMapper;
import com.lemoo.user.repository.UserRepository;
import com.lemoo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Value("${assets.default-avatar}")
    private String defaultAvatar;

    @Override
    public void createUser(String accountId, String userId, String displayName, String avatar) {
        User user = User.builder()
                .displayName(displayName)
                .accountId(accountId)
                .avatar(avatar != null ? avatar : defaultAvatar)
                .build();
        user.setId(userId);
        userRepository.save(user);
    }

    @Override
    public UserResponse getUserProfile(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotfoundException("User not found!"));
        return userMapper.userToUserResponse(user);
    }
}
