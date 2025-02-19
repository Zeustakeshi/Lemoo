/*
 *  InternalUserController
 *  @author: Minhhieuano
 *  @created 1/4/2025 4:29 PM
 * */


package com.lemoo.user.controller;

import com.lemoo.user.dto.request.BatchFetchUserInfoRequest;
import com.lemoo.user.dto.response.ApiResponse;
import com.lemoo.user.dto.response.InternalUserResponse;
import com.lemoo.user.service.InternalUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalUserController {
    private final InternalUserService internalUserService;

    @GetMapping("{userId}")
    public ApiResponse<InternalUserResponse> getUserInfo(
            @PathVariable("userId") String userId
    ) {
        return ApiResponse.success(internalUserService.getUserById(userId));
    }

    @GetMapping("batch-fetch")
    public ApiResponse<Set<InternalUserResponse>> batchFetchUserInfo(
            @RequestBody @Valid BatchFetchUserInfoRequest request
    ) {
        return ApiResponse.success(internalUserService.batchFetchUserInfo(request));
    }
}
