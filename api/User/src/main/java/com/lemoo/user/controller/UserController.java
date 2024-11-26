/*
 *  UserController
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:51 PM
 * */

package com.lemoo.user.controller;

import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.response.ApiResponse;
import com.lemoo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@GetMapping("me")
	@ResponseStatus(HttpStatus.OK)
	public ApiResponse<?> getUserProfile(@AuthenticationPrincipal AuthenticatedAccount account) {
		return ApiResponse.success(userService.getUserProfile(account.getUserId()));
	}
}
