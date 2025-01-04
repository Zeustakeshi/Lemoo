/*
 *  InternalUserController
 *  @author: Minhhieuano
 *  @created 1/4/2025 4:29 PM
 * */


package com.lemoo.user.controller;

import com.lemoo.user.dto.response.ApiResponse;
import com.lemoo.user.service.InternalUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalUserController {
    private final InternalUserService internalUserService;

    @GetMapping("{userId}")
    public ApiResponse<?> getUserInfo(
            @PathVariable("userId") String userId
    ) {
        return ApiResponse.success(internalUserService.getUserById(userId));
    }
}
