/*
 *  UserService
 *  @author: Minhhieuano
 *  @created 2/7/2025 11:05 PM
 * */


package com.lemoo.chat.service;

import com.lemoo.chat.dto.response.UserResponse;

import java.util.Optional;

public interface UserService {
    Optional<UserResponse> getUserInfo(String userId);
}
