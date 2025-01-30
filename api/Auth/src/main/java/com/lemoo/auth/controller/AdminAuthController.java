/*
 *  AdminAuthController
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:32 AM
 * */


package com.lemoo.auth.controller;

import com.lemoo.auth.dto.request.AdminLoginRequest;
import com.lemoo.auth.dto.response.ApiResponse;
import com.lemoo.auth.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ApiResponse<?> login(
            @RequestBody @Valid AdminLoginRequest request
    ) {
        return ApiResponse.success(adminAuthService.login(request));
    }

}
