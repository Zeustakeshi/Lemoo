/*
 *  InternalStoreController
 *  @author: Minhhieuano
 *  @created 12/14/2024 2:19 PM
 * */

package com.lemoo.store.controller;

import com.lemoo.store.dto.request.VerifyStoreRequest;
import com.lemoo.store.dto.response.ApiResponse;
import com.lemoo.store.service.InternalStoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalStoreController {
	private final InternalStoreService internalStoreService;

	@PostMapping("/verify")
	public ApiResponse<?> verifyStore(@RequestBody @Valid VerifyStoreRequest request) {
		return ApiResponse.success(internalStoreService.verifyStore(request));
	}
}
