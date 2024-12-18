/*
 *  ProductMediaController
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:35 PM
 * */

package com.lemoo.product.controller;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.product.dto.request.DeleteProductImageRequest;
import com.lemoo.product.dto.request.UploadProductImageRequest;
import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.service.ProductMediaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products/{productId}/media")
@RequiredArgsConstructor
public class ProductMediaController {
	private static final String STORE_ID_REQUEST_HEADER = "X-Store-Id";
	private final ProductMediaService productMediaService;

	@PostMapping("images")
	public ApiResponse<?> uploadProductImage(
			@RequestHeader(STORE_ID_REQUEST_HEADER) String storeId,
			@PathVariable("productId") String productId,
			@ModelAttribute @Valid UploadProductImageRequest request) {
		String fakeUserId = NanoIdUtils.randomNanoId();
		return ApiResponse.success(productMediaService.uploadImage(storeId, fakeUserId, productId, request));
	}

	@DeleteMapping("images")
	public ApiResponse<?> deleteProductImage(
			@RequestHeader(STORE_ID_REQUEST_HEADER) String storeId,
			@PathVariable("productId") String productId,
			@RequestBody @Valid DeleteProductImageRequest request) {
		String fakeUserId = NanoIdUtils.randomNanoId();
		productMediaService.deleteImage(storeId, fakeUserId, productId, request);
		return ApiResponse.success(true);
	}
}
