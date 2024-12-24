/*
 *  UserCacheService
 *  @author: Minhhieuano
 *  @created 12/24/2024 12:50 AM
 * */


package com.lemoo.video.service;

import com.lemoo.video.dto.response.UserResponse;

public interface UserCacheService {
    UserResponse finUserById(String userId);
}
