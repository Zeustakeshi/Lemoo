/*
 *  OAuthController
 *  @author: Minhhieuano
 *  @created 3/15/2025 3:23 PM
 * */


package com.lemoo.auth.controller;

import com.lemoo.auth.dto.request.OAuthLoginRequest;
import com.lemoo.auth.dto.response.ApiResponse;
import com.lemoo.auth.dto.response.TokenResponse;
import com.lemoo.auth.service.GoogleOAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OAuthController {
    private final GoogleOAuthService googleOAuthService;

    @GetMapping("/google")
    public ApiResponse<String> getGoogleOAuthUrl() {
        return ApiResponse.success(googleOAuthService.getOAuthUrl());
    }

    @PostMapping("/google")
    public ApiResponse<TokenResponse> googleLogin(
            @RequestBody @Valid OAuthLoginRequest request
    ) {
        return ApiResponse.success(googleOAuthService.login(request));
    }

}
