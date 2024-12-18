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


    @PostMapping()
    public ApiResponse<?> createChannel(@RequestBody @Valid ChannelRequest request) {
        return ApiResponse.success(channelService.createChannel(request, fakeAccount()));
    }

    @PutMapping
    public ApiResponse<?> updateChannel(@RequestBody @Valid ChannelRequest request) {
        return ApiResponse.success(channelService.updateChannel(request, fakeAccount()));
    }

    @GetMapping("{channelId}")
    public ApiResponse<?> getChannelDetail(@PathVariable("channelId") String channelId) {
        return ApiResponse.success(channelService.getChannelDetail(channelId, fakeAccount()));
    }

    @PostMapping("{channelId}/follow")
    public ApiResponse<?> followChannel(@PathVariable("channelId") String channelId) {
        channelService.followChannel(channelId, fakeAccount());
        return ApiResponse.success(true);
    }

    @DeleteMapping("{channelId}/follow")
    public ApiResponse<?> unfollowChannel(@PathVariable("channelId") String channelId) {
        channelService.unfollowChannel(channelId, fakeAccount());
        return ApiResponse.success(true);
    }


    private AuthenticatedAccount fakeAccount() {
        String userId = System.getenv("TEST_USER");
        System.out.println();
        System.out.println("===================================");

        System.out.println("request with fake-userId= " + userId);

        System.out.println("===================================");
        System.out.println();
        System.out.println();
        return AuthenticatedAccount.builder()
                .email("test-user@gmail.com")
                .id("62616d246f3f77054670a456")
                .userId(userId)
                .build();
    }
}


// channel user-2: 6762704d691030667a0e0798
// channel user-3: 67627acc5bc45544d36fbfc2
// channel user-4: 67627a0f4c347b4ee8982130
