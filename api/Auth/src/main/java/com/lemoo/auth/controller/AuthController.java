/*
 *  AuthController
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:21 PM
 * */


package com.lemoo.auth.controller;

import com.lemoo.auth.dto.response.ApiResponse;
import com.lemoo.auth.dto.response.OtpResponse;
import com.lemoo.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<?> register() {
        return ApiResponse.success(new OtpResponse("otp-test"));
    }

}
