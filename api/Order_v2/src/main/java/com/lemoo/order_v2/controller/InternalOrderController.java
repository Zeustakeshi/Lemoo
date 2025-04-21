/*
 *  InternalOrderController
 *  @author: pc
 *  @created 4/21/2025 7:56 PM
 * */


package com.lemoo.order_v2.controller;

import com.lemoo.order_v2.dto.response.ApiResponse;
import com.lemoo.order_v2.service.InternalOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalOrderController {
    private final InternalOrderService internalOrderService;

    @GetMapping("/users/{userId}")
    public ApiResponse<?> getAllUserOrder(
            @PathVariable("userId") String userId,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit
    ) {
        return ApiResponse.success(internalOrderService.getAllOrders(userId, page, limit));
    }
}
