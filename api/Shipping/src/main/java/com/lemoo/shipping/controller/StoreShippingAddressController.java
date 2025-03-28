/*
 *  StoreShippingAddressController
 *  @author: pc
 *  @created 3/28/2025 11:55 PM
 * */


package com.lemoo.shipping.controller;

import com.lemoo.shipping.common.constants.CustomRequestHeader;
import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.service.StoreShippingAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/store/address")
@RequiredArgsConstructor
public class StoreShippingAddressController {
    private final StoreShippingAddressService storeShippingAddressService;

    @PostMapping
    public ApiResponse<?> saveShippingAddress(
            @RequestBody @Valid ShippingAddressRequest request,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(storeShippingAddressService.saveStoreShippingAddress(account, storeId, request));
    }

    @GetMapping
    public ApiResponse<?> getStoreShippingAddress(
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(storeShippingAddressService.getStoreShippingAddress(account, storeId));
    }

}
