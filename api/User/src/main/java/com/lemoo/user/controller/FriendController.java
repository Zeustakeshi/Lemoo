package com.lemoo.user.controller;

import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.response.ApiResponse;
import com.lemoo.user.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("friends")
@RequiredArgsConstructor
public class FriendController {

	private final FriendService friendService;

	@GetMapping
	public ApiResponse<?> getCurrentFriendList(
			@AuthenticationPrincipal AuthenticatedAccount user,
			@RequestParam(name = "page", required = false, defaultValue = "0") int page,
			@RequestParam(name = "limit", required = false, defaultValue = "10") int limit) {
		return ApiResponse.success(friendService.getCurrentFriendList(user.getUserId(), page, limit));
	}

	@GetMapping("/recommend")
	public ApiResponse<?> getRecommendFriendList(
			@AuthenticationPrincipal AuthenticatedAccount user,
			@RequestParam(name = "page", required = false, defaultValue = "0") int page,
			@RequestParam(name = "limit", required = false, defaultValue = "10") int limit) {
		return ApiResponse.success((friendService.getRecommendFriendList(user.getUserId(), page, limit)));
	}
}
