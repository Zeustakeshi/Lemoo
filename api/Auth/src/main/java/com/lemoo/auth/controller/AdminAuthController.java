/*
 *  AdminAuthController
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:32 AM
 * */


package com.lemoo.auth.controller;

import com.lemoo.auth.dto.request.AdminCreateAccountRequest;
import com.lemoo.auth.dto.request.AdminLoginRequest;
import com.lemoo.auth.dto.response.ApiResponse;
import com.lemoo.auth.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createAccount(
            @RequestBody @Valid AdminCreateAccountRequest request
    ) {
        return ApiResponse.success(adminAuthService.createAccount(request));
    }

    @PostMapping("/login")
    public ApiResponse<?> login(
            @RequestBody @Valid AdminLoginRequest request
    ) {
        return ApiResponse.success(adminAuthService.login(request));
    }

}
