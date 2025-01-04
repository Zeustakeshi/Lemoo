/*
 *  InternalUserServiceImpl
 *  @author: Minhhieuano
 *  @created 1/4/2025 4:31 PM
 * */


package com.lemoo.user.service.impl;

import com.lemoo.user.dto.response.InternalUserResponse;
import com.lemoo.user.entity.User;
import com.lemoo.user.exception.NotfoundException;
import com.lemoo.user.mapper.UserMapper;
import com.lemoo.user.repository.UserRepository;
import com.lemoo.user.service.InternalUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternalUserServiceImpl implements InternalUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public InternalUserResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotfoundException("User not found"));
        return userMapper.toInternalUserResponse(user);
    }
}
