/*
 *  UserService
 *  @author: Minhhieuano
 *  @created 2/7/2025 11:05 PM
 * */


package com.lemoo.shipping.service;


import com.lemoo.shipping.dto.response.UserResponse;

import java.util.Optional;

public interface UserService {
    Optional<UserResponse> getUserInfo(String userId);
}
