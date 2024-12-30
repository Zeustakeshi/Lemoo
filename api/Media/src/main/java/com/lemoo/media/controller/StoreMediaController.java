/*
 *  ProductController
 *  @author: Minhhieuano
 *  @created 12/26/2024 12:44 AM
 * */

package com.lemoo.media.controller;

import com.lemoo.media.dto.common.AuthenticatedAccount;
import com.lemoo.media.dto.request.UploadImageRequest;
import com.lemoo.media.dto.response.ApiResponse;
import com.lemoo.media.service.StoreMediaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stores")
@RequiredArgsConstructor
public class StoreMediaController {

	private final StoreMediaService storeMediaService;

	@PostMapping("/{storeId}/images")
	@ResponseStatus(HttpStatus.CREATED)
	private ApiResponse<?> uploadImage(
			@ModelAttribute @Valid UploadImageRequest request,
			@AuthenticationPrincipal AuthenticatedAccount account,
			@PathVariable("storeId") String storeId) {
		return ApiResponse.success(storeMediaService.uploadImage(storeId, account, request));
	}

	@GetMapping("/{storeId}/images")
	public ApiResponse<?> getAllStoreImages(
			@PathVariable("storeId") String storeId,
			@RequestParam(name = "page", required = false, defaultValue = "0") int page,
			@RequestParam(name = "limit", required = false, defaultValue = "10") int limit,
			@AuthenticationPrincipal AuthenticatedAccount account) {
		return ApiResponse.success(storeMediaService.getAllImageByStoreId(storeId, account, page, limit));
	}

	@DeleteMapping("/{storeId}/images/{imageId}")
	public ApiResponse<?> deleteStoreImage(
			@PathVariable("storeId") String storeId,
			@PathVariable("imageId") String imageId,
			@AuthenticationPrincipal AuthenticatedAccount account) {
		storeMediaService.deleteImageAsync(imageId, storeId, account);
		return ApiResponse.success(true);
	}
}
