/*
 *  TestController
 *  @author: Minhhieuano
 *  @created 11/12/2024 10:34 PM
 * */

package com.lemoo.store.controller;

import com.lemoo.store.dto.common.AuthenticatedAccount;
import com.lemoo.store.dto.request.CreateCorporateStoreRequest;
import com.lemoo.store.dto.request.CreateIndividualStoreRequest;
import com.lemoo.store.dto.response.ApiResponse;
import com.lemoo.store.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class StoreController {
	private final StoreService storeService;

	@GetMapping("/info")
	@ResponseStatus(HttpStatus.OK)
	public ApiResponse<?> getStoreInfo(@AuthenticationPrincipal AuthenticatedAccount account) {
		return ApiResponse.success(storeService.getStoreInfo(account));
	}

	@PostMapping("/individual")
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<?> createIndividualStore(
			@AuthenticationPrincipal AuthenticatedAccount account,
			@Valid @ModelAttribute("request") CreateIndividualStoreRequest request) {
		return ApiResponse.success(storeService.createIndividualStore(account, request));
	}

	@PostMapping("/corporate")
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<?> createCorporateStore(
			@AuthenticationPrincipal AuthenticatedAccount account,
			@Valid @ModelAttribute("request") CreateCorporateStoreRequest request) {
		return ApiResponse.success(storeService.createCorporateStore(account, request));
	}
}
