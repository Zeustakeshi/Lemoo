/*
 *  BuyerShippingController
 *  @author: Minhhieuano
 *  @created 1/15/2025 9:58 AM
 * */


package com.lemoo.shipping.controller;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.service.BuyerShippingAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/my-address")
@RequiredArgsConstructor
public class BuyerShippingAddressController {
    private final BuyerShippingAddressService buyerShippingAddressService;

    @GetMapping()
    public ApiResponse<?> getAllShippingAddress(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(buyerShippingAddressService.getAllShipAddress(account, page, limit));
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createShippingAddress(
            @RequestBody @Valid ShippingAddressRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(buyerShippingAddressService.createShippingAddress(account, request));
    }

    @PutMapping("/{addressId}")
    public ApiResponse<Boolean> updateDefaultAddress(
            @PathVariable("addressId") String addressId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        buyerShippingAddressService.updateDefaultAddress(account, addressId);
        return ApiResponse.success(true);
    }

}
