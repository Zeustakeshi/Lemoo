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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("channels")
@RequiredArgsConstructor
public class ChannelController {


    private final ChannelService channelService;
    private final AuthenticatedAccount fakeAccount = AuthenticatedAccount.builder()
            .email("test-user@gmail.com")
            .id("62616d246f3f77054670a456")
            .build();


    @PostMapping()
    public ApiResponse<?> createChannel(
            @RequestBody @Valid ChannelRequest request
    ) {
        return ApiResponse.success(channelService.createChannel(request, fakeAccount));
    }

    @PutMapping
    public ApiResponse<?> updateChannel(@RequestBody @Valid ChannelRequest request) {
        return ApiResponse.success(channelService.updateChannel(request, fakeAccount));
    }

    @GetMapping("{channelId}")
    public ApiResponse<?> getChannelDetail(@PathVariable("channelId") String channelId) {
        return ApiResponse.success(channelService.getChannelDetail(channelId, fakeAccount));
    }

    @PostMapping("{channelId}/follow")
    public ApiResponse<?> followChannel(
            @PathVariable("channelId") String channelId
    ) {
        channelService.followChannel(channelId, fakeAccount);
        return ApiResponse.success(true);
    }

    @DeleteMapping("{channelId}/follow")
    public ApiResponse<?> unfollowChannel(
            @PathVariable("channelId") String channelId
    ) {
        channelService.unfollowChannel(channelId, fakeAccount);
        return ApiResponse.success(true);
    }
}
