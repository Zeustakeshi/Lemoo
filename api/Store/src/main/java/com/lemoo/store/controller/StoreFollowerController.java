/*
 *  UserStoreController
 *  @author: Minhhieuano
 *  @created 2/24/2025 10:29 PM
 * */


package com.lemoo.store.controller;

import com.lemoo.store.dto.common.AuthenticatedAccount;
import com.lemoo.store.dto.response.ApiResponse;
import com.lemoo.store.service.StoreFollowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/{storeId}")
@RequiredArgsConstructor
public class StoreFollowerController {
    private final StoreFollowerService storeFollowerService;

    @GetMapping("/follow/status")
    public ApiResponse<Boolean> getStoreFollowStatus(
            @PathVariable("storeId") String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(storeFollowerService.getFollowStatus(storeId, account));
    }

    @PostMapping("follow")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Boolean> followStore(
            @PathVariable("storeId") String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(storeFollowerService.followStore(storeId, account));
    }


    @PostMapping("unfollow")
    public ApiResponse<Boolean> unFollowStore(
            @PathVariable("storeId") String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(storeFollowerService.unFollowStore(storeId, account));
    }
}
