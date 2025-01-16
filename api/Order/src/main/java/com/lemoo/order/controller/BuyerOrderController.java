/*
 *  OrderController
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:58 AM
 * */


package com.lemoo.order.controller;

import com.lemoo.order.dto.common.AuthenticatedAccount;
import com.lemoo.order.dto.request.OrderRequest;
import com.lemoo.order.dto.response.ApiResponse;
import com.lemoo.order.service.BuyerOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buyers")
@RequiredArgsConstructor
public class BuyerOrderController {
    private final BuyerOrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createOrder(
            @RequestBody @Valid OrderRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(orderService.createOrder(account, request));
    }

}
