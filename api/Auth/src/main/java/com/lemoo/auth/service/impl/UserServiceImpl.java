/*
 *  UserServiceImple
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:17 AM
 * */

package com.lemoo.auth.service.impl;

import com.lemoo.auth.dto.response.UserResponse;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.entity.User;
import com.lemoo.auth.exception.NotfoundException;
import com.lemoo.auth.mapper.UserMapper;
import com.lemoo.auth.repository.UserRepository;
import com.lemoo.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;

	@Value("${assets.default-avatar-man}")
	private String defaultAvatar;

	@Override
	public void createUser(String accountId, String userId, String displayName) {
		User user = User.builder()
				.displayName(displayName)
				.accountId(accountId)
				.avatar(defaultAvatar)
				.build();
		user.setId(userId);
		userRepository.save(user);
	}

	@Override
	public UserResponse getUserProfile(Account account) {
		User user = userRepository
				.findByAccountId(account.getId())
				.orElseThrow(() -> new NotfoundException("User not found!"));

		UserResponse userResponse = userMapper.userToUserResponse(user);
		userResponse.setEmail(account.getEmail());
		userResponse.setPhone(account.getPhone());
		return userResponse;
	}
}
