/*
 *  UserService
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:28 PM
 * */

package com.lemoo.user.service;

import com.lemoo.user.dto.response.UserResponse;

public interface UserService {
    void createUser(String accountId, String userId, String displayName, String avatar);

    UserResponse getUserProfile(String userId);
}
