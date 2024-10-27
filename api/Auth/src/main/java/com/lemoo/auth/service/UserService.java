/*
 *  UserService
 *  @author: Minhhieuano
 *  @created 10/27/2024 10:49 AM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.dto.response.UserResponse;
import com.lemoo.auth.entity.Account;

public interface UserService {
	UserResponse getUserProfile(Account account);

	void createUser(String accountId, String userId, String displayName);
}
