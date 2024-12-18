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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shorts/view")
@RequiredArgsConstructor
public class VideoViewController {
    private final VideoViewService videoViewService;

    @GetMapping("/following")
    public ApiResponse<?> getFollowingVideos(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "3") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(videoViewService.getFollowingVideo(page, limit, account));
    }

    @GetMapping("/recommend")
    public ApiResponse<?> getRecommendVideos(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "3") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(videoViewService.getRecommendVideo(page, limit, account));
    }

    @GetMapping("/{videoId}/reaction")
    public ApiResponse<?> getVideoReaction(
            @PathVariable("videoId") String videoId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(videoViewService.getVideoReaction(videoId, account));
    }

    @PostMapping("/{videoId}/reaction")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> reactionVideo(
            @PathVariable("videoId") String videoId,
            @RequestParam("type") ReactionType type,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(videoViewService.reactionVideo(type, videoId, account));
    }

    @DeleteMapping("{videoId}/reaction")
    public ApiResponse<?> unReactionVideo(
            @PathVariable("videoId") String videoId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(videoViewService.unReactionVideo(videoId, account));
    }


}
