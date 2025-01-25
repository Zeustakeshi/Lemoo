/*
 *  CartController
 *  @author: Minhhieuano
 *  @created 1/25/2025 11:00 AM
 * */


package com.lemoo.order.controller;

import com.lemoo.order.dto.common.AuthenticatedAccount;
import com.lemoo.order.dto.response.ApiResponse;
import com.lemoo.order.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ApiResponse<?> getUserCart(
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(cartService.getUserCart(account.getUserId()));
    }

}
