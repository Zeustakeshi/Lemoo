/*
 *  ChannelController
 *  @author: Minhhieuano
 *  @created 12/16/2024 10:00 PM
 * */

package com.lemoo.video.controller;

import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.ChannelRequest;
import com.lemoo.video.dto.response.ApiResponse;
import com.lemoo.video.service.ChannelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping("/connect/seller-center")
    public ApiResponse<?> connectToStore(
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(channelService.connectToSellerCenter(account));
    }

    @PostMapping()
    public ApiResponse<?> createChannel(
            @RequestBody @Valid ChannelRequest request, @AuthenticationPrincipal AuthenticatedAccount account) {
        return ApiResponse.success(channelService.createChannel(request, account));
    }

    @PutMapping
    public ApiResponse<?> updateChannel(
            @RequestBody @Valid ChannelRequest request, @AuthenticationPrincipal AuthenticatedAccount account) {
        return ApiResponse.success(channelService.updateChannel(request, account));
    }

    @GetMapping("/me")
    public ApiResponse<?> getChannelInfo(@AuthenticationPrincipal AuthenticatedAccount account) {
        return ApiResponse.success(channelService.getChannelInfo(account));
    }

    @GetMapping("{channelId}")
    public ApiResponse<?> getChannelDetail(
            @PathVariable("channelId") String channelId, @AuthenticationPrincipal AuthenticatedAccount account) {
        return ApiResponse.success(channelService.getChannelDetail(channelId, account));
    }

    @PostMapping("{channelId}/follow")
    public ApiResponse<?> followChannel(
            @PathVariable("channelId") String channelId, @AuthenticationPrincipal AuthenticatedAccount account) {
        channelService.followChannel(channelId, account);
        return ApiResponse.success(true);
    }

    @DeleteMapping("{channelId}/follow")
    public ApiResponse<?> unfollowChannel(
            @PathVariable("channelId") String channelId, @AuthenticationPrincipal AuthenticatedAccount account) {
        channelService.unfollowChannel(channelId, account);
        return ApiResponse.success(true);
    }
}
