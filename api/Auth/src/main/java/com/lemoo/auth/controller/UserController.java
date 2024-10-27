/*
 *  UserController
 *  @author: Minhhieuano
 *  @created 10/27/2024 10:49 AM
 * */

package com.lemoo.auth.controller;

import com.lemoo.auth.dto.response.ApiResponse;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@GetMapping("me")
	@ResponseStatus(HttpStatus.OK)
	public ApiResponse<?> getUserProfile(@AuthenticationPrincipal Account account) {
		return ApiResponse.success(userService.getUserProfile(account));
	}
}
