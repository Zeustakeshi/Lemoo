/*
 *  TokenController
 *  @author: Minhhieuano
 *  @created 10/18/2024 10:14 PM
 * */

package com.lemoo.auth.controller;

import com.lemoo.auth.dto.request.RefreshTokenRequest;
import com.lemoo.auth.dto.response.ApiResponse;
import com.lemoo.auth.service.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/token")
@RequiredArgsConstructor
public class TokenController {
	private final TokenService tokenService;

	@PostMapping("/refresh")
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<?> refreshToken(@RequestBody @Valid RefreshTokenRequest request) {
		return ApiResponse.success(tokenService.refreshToken(request));
	}
}
