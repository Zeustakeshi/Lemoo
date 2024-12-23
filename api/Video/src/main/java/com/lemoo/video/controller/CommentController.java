/*
 *  CommentController
 *  @author: Minhhieuano
 *  @created 12/18/2024 4:29 PM
 * */

package com.lemoo.video.controller;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.CommentRequest;
import com.lemoo.video.dto.response.ApiResponse;
import com.lemoo.video.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shorts/view/{videoId}/comments")
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;

	@PostMapping()
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<?> createComment(
			@PathVariable("videoId") String videoId,
			@AuthenticationPrincipal AuthenticatedAccount account,
			@RequestBody @Valid CommentRequest request) {
		return ApiResponse.success(commentService.createComment(request, videoId, account));
	}

	@GetMapping()
	public ApiResponse<?> getAllComment(
			@PathVariable("videoId") String videoId,
			@AuthenticationPrincipal AuthenticatedAccount account,
			@RequestParam(value = "parent", required = false) String parentId,
			@RequestParam(value = "page", required = false, defaultValue = "0") int page,
			@RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
		return ApiResponse.success(commentService.getAllComment(parentId, page, limit, videoId, account));
	}

	@PostMapping("{commentId}/reaction")
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<?> reactionComment(
			@PathVariable("videoId") String videoId,
			@PathVariable("commentId") String commentId,
			@RequestParam("type") ReactionType type,
			@AuthenticationPrincipal AuthenticatedAccount account) {
		return ApiResponse.success(commentService.reactionComment(type, commentId, videoId, account));
	}

	@DeleteMapping("{commentId}/reaction")
	public ApiResponse<?> unReactionComment(
			@PathVariable("videoId") String videoId,
			@PathVariable("commentId") String commentId,
			@AuthenticationPrincipal AuthenticatedAccount account) {
		return ApiResponse.success(commentService.unReactionComment(commentId, videoId, account));
	}

	@DeleteMapping("{commentId}")
	public ApiResponse<?> deleteComment(
			@PathVariable("videoId") String videoId,
			@PathVariable("commentId") String commentId,
			@AuthenticationPrincipal AuthenticatedAccount account) {
		return ApiResponse.success(commentService.deleteComment(commentId, videoId, account));
	}
}
