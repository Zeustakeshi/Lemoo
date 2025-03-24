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
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OAuthController {
    private final GoogleOAuthService googleOAuthService;

    @GetMapping("/google")
    public ApiResponse<String> getGoogleOAuthUrl(
            @RequestParam(value = "sso_redirect_url", required = false, defaultValue = "") String redirectUrl
    ) {
        return ApiResponse.success(googleOAuthService.getOAuthUrl(Map.of("sso_redirect_url", redirectUrl)));
    }

    @PostMapping("/google")
    public ApiResponse<TokenResponse> googleLogin(
            @RequestBody @Valid OAuthLoginRequest request
    ) {
        return ApiResponse.success(googleOAuthService.login(request));
    }

}
