/*
 *  VideoController
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:58 PM
 * */

package com.lemoo.video.controller;

import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.UpdateVideoMetadataRequest;
import com.lemoo.video.dto.request.UploadVideoRequest;
import com.lemoo.video.dto.response.ApiResponse;
import com.lemoo.video.service.VideoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("{channelId}/shorts")
@RequiredArgsConstructor
public class VideoController {
	private final AuthenticatedAccount fakeAccount = AuthenticatedAccount.builder()
			.email("test-user@gmail.com")
			.id("62616d246f3f77054670a456")
			.userId("user-2")
			.build();

	private final VideoService videoService;

	@GetMapping()
	public ApiResponse<?> getAllVideoByChannelId(
			@PathVariable("channelId") String channelId,
			@RequestParam(value = "page", required = false, defaultValue = "0") int page,
			@RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
		return ApiResponse.success(videoService.getAllByChannelId(channelId, page, limit, fakeAccount));
	}

	@PostMapping("upload")
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<?> uploadVideo(
			@PathVariable("channelId") String channelId, @ModelAttribute @Valid UploadVideoRequest request) {
		return ApiResponse.success(videoService.uploadVideo(request, channelId, fakeAccount));
	}

	@PutMapping("{videoId}/metadata")
	public ApiResponse<?> updateVideoMetadata(
			@PathVariable("channelId") String channelId,
			@PathVariable("videoId") String videoId,
			@RequestBody @Valid UpdateVideoMetadataRequest request) {
		return ApiResponse.success(videoService.updateVideoMetadata(request, videoId, channelId, fakeAccount));
	}
}
