/*
 *  CartController
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:39 PM
 * */

package com.lemoo.order_v2.controller;

import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.AddToCartRequest;
import com.lemoo.order_v2.dto.response.ApiResponse;
import com.lemoo.order_v2.service.CartItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
	private final CartItemService cartItemService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ApiResponse<String> addSkuToCart(
			@RequestBody @Valid AddToCartRequest request, @AuthenticationPrincipal AuthenticatedAccount account) {
		return ApiResponse.success(cartItemService.addToCart(request, account));
	}
}
