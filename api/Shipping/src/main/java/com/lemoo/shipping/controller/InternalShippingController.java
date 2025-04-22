/*
 *  InternalShippingController
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:11 AM
 * */


package com.lemoo.shipping.controller;

import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.dto.response.InternalShippingAddressResponse;
import com.lemoo.shipping.service.InternalShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalShippingController {
    private final InternalShippingAddressService shippingService;

    @GetMapping("{addressId}")
    public ApiResponse<InternalShippingAddressResponse> getShippingAddress(
            @PathVariable("addressId") String addressId,
            @RequestHeader("x-user-id") String userId
    ) {
        return ApiResponse.success(shippingService.getShippingAddressByIdAndUserId(addressId, userId));
    }

    @GetMapping("address")
    public ApiResponse<List<InternalShippingAddressResponse>> getAllShippingAddress(
            @RequestHeader("x-user-id") String userId
    ) {
        return ApiResponse.success(shippingService.getAllShippingAddress(userId));
    }


}
