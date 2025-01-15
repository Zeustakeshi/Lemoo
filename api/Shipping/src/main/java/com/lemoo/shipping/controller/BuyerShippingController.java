/*
 *  BuyerShippingController
 *  @author: Minhhieuano
 *  @created 1/15/2025 9:58 AM
 * */


package com.lemoo.shipping.controller;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.service.ShippingAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("my-address")
@RequiredArgsConstructor
public class BuyerShippingController {
    private final ShippingAddressService shippingAddressService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createShippingAddress(
            @RequestBody @Valid ShippingAddressRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(shippingAddressService.createShippingAddress(account, request));
    }

}
