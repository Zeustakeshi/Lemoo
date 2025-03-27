/*
 *  SellerOrderController
 *  @author: pc
 *  @created 3/26/2025 10:29 AM
 * */


package com.lemoo.order_v2.controller;

import com.lemoo.order_v2.common.constants.CustomRequestHeader;
import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.response.ApiResponse;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.dto.response.SellerOrderResponse;
import com.lemoo.order_v2.service.SellerOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders/seller")
@RequiredArgsConstructor
public class SellerOrderController {
    private final SellerOrderService sellerOrderService;

    @GetMapping
    public ApiResponse<PageableResponse<SellerOrderResponse>> getAllStoreOrder(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
            @RequestParam(value = "status", required = false, defaultValue = "PENDING") OrderStatus status,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        return ApiResponse.success(sellerOrderService.getAllOrderByStoreId(storeId, status, page, limit, account));
    }

    @PutMapping("{orderId}/packed")
    public ApiResponse<String> packedOrder(
            @PathVariable("orderId") String orderId,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        sellerOrderService.packedOrder(orderId, storeId, account);
        return ApiResponse.success("Order has been successfully update status to packed");
    }

    @PutMapping("/{orderId}/confirm")
    public ApiResponse<String> confirmOrder(
            @PathVariable("orderId") String orderId,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        sellerOrderService.confirmOrder(orderId, storeId, account);
        return ApiResponse.success("Order has been successfully confirmed");
    }

    @PutMapping("/{orderId}/cancel")
    public ApiResponse<String> cancelOrder(
            @PathVariable("orderId") String orderId,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        sellerOrderService.cancelOrder(orderId, storeId, account);
        return ApiResponse.success("Order has been successfully cancelled");
    }
}
