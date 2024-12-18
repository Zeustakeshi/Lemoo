/*
 *  VideoViewController
 *  @author: Minhhieuano
 *  @created 12/18/2024 2:38 PM
 * */


package com.lemoo.video.controller;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.response.ApiResponse;
import com.lemoo.video.service.VideoViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shorts/view")
@RequiredArgsConstructor
public class VideoViewController {
    private final VideoViewService videoViewService;

    @GetMapping("/following")
    public ApiResponse<?> getFollowingVideos(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "3") int limit
    ) {
        return ApiResponse.success(videoViewService.getFollowingVideo(page, limit, fakeAccount()));
    }

    @GetMapping("/recommend")
    public ApiResponse<?> getRecommendVideos(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "3") int limit
    ) {
        return ApiResponse.success(videoViewService.getRecommendVideo(page, limit, fakeAccount()));
    }

    @GetMapping("/{videoId}/reaction")
    public ApiResponse<?> getVideoReaction(
            @PathVariable("videoId") String videoId
    ) {
        return ApiResponse.success(videoViewService.getVideoReaction(videoId, fakeAccount()));
    }

    @PostMapping("/{videoId}/reaction")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> reactionVideo(
            @PathVariable("videoId") String videoId,
            @RequestParam("type") ReactionType type
    ) {
        return ApiResponse.success(videoViewService.reactionVideo(type, videoId, fakeAccount()));
    }

    @DeleteMapping("{videoId}/reaction")
    public ApiResponse<?> unReactionVideo(
            @PathVariable("videoId") String videoId
    ) {
        return ApiResponse.success(videoViewService.unReactionVideo(videoId, fakeAccount()));
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
