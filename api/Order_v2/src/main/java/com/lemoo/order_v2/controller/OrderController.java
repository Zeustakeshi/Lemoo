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
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ApiResponse<PageableResponse<OrderResponse>> getAllOrders(
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit
    ) {
        return ApiResponse.success(orderService.getAllOrders(account, page, limit));
    }

    @PostMapping
    public ApiResponse<String> placeOrder(
            @RequestBody @Valid OrderRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        orderService.placeOrder(request, account);
        return ApiResponse.success("Order has been created!");
    }
}
