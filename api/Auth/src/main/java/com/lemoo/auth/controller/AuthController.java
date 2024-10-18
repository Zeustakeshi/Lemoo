/*
 *  AuthController
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:21 PM
 * */

package com.lemoo.auth.controller;

import com.lemoo.auth.dto.request.CreateAccountRequest;
import com.lemoo.auth.dto.request.LoginRequest;
import com.lemoo.auth.dto.request.ResendOtpRequest;
import com.lemoo.auth.dto.request.VerifyOtpRequest;
import com.lemoo.auth.dto.response.ApiResponse;
import com.lemoo.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<?> register(
            @RequestBody @Valid CreateAccountRequest request
    ) {
        return ApiResponse.success(authService.createAccount(request));
    }

    @PostMapping("/register/otp/resend")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<?> resendCreateAccountOtp(
            @RequestBody @Valid ResendOtpRequest request
    ) {
        authService.resendCreateAccountOtp(request);
        return ApiResponse.success(true);
    }

    @PostMapping("/register/otp/verify")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<?> verifyCreateAccountOtp(
            @RequestBody @Valid VerifyOtpRequest request
    ) {
        return ApiResponse.success(authService.verifyCreateAccountOtp(request));
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<?> login(
            @RequestBody @Valid LoginRequest request
    ) {
        return ApiResponse.success(authService.login(request));
    }

    @PostMapping("/login/mfa/resend")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<?> resendMfaOtp(
            @RequestBody @Valid ResendOtpRequest request
    ) {
        authService.resendMfaOtp(request);
        return ApiResponse.success(true);
    }

    @PostMapping("/login/mfa/verify")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<?> verifyMfaOtp(
            @RequestBody @Valid VerifyOtpRequest request
    ) {
        return ApiResponse.success(authService.verifyMfaOtp(request));
    }


}
