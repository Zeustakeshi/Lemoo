/*
 *  ShippingOrderController
 *  @author: pc
 *  @created 4/15/2025 8:11 AM
 * */


package com.lemoo.shipping.controller;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class ShippingOrderController {
    private final ShippingService shippingService;

    @GetMapping("/{orderId}")
    public ApiResponse<?> getShippingOrderByOrderId(
            @PathVariable("orderId") String orderId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(shippingService.getShippingOrderByOrderId(orderId, account));
    }
}
