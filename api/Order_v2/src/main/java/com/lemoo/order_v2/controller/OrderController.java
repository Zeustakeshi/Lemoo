/*
 *  OrderController
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:49 PM
 * */


package com.lemoo.order_v2.controller;

import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.OrderRequest;
import com.lemoo.order_v2.dto.response.ApiResponse;
import com.lemoo.order_v2.dto.response.OrderResponse;
import com.lemoo.order_v2.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> placeOrder(
            @RequestBody @Valid OrderRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(orderService.placeOrder(request, account));
    }
}
