/*
 *  BuyerShippingController
 *  @author: Minhhieuano
 *  @created 1/15/2025 9:58 AM
 * */


package com.lemoo.shipping.controller;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.entity.BasePartialAddress;
import com.lemoo.shipping.service.ShippingAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BuyerShippingAddressController {
    private final ShippingAddressService shippingAddressService;

    @GetMapping("/provinces")
    public ApiResponse<List<BasePartialAddress>> getProvinces() {
        return ApiResponse.success(shippingAddressService.getProvinces());
    }

    @GetMapping("/districts")
    public ApiResponse<List<BasePartialAddress>> getDistricts() {
        return ApiResponse.success(shippingAddressService.getDistricts());
    }

    @GetMapping("/wards")
    public ApiResponse<List<BasePartialAddress>> getWards(
            @RequestParam("districtCode") String districtCode
    ) {
        return ApiResponse.success(shippingAddressService.getWards(districtCode));
    }

    @GetMapping("my-address")
    public ApiResponse<?> getAllShippingAddress(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(shippingAddressService.getAllShipAddress(account, page, limit));
    }

    @PostMapping("/my-address")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createShippingAddress(
            @RequestBody @Valid ShippingAddressRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(shippingAddressService.createShippingAddress(account, request));
    }

    @PutMapping("/my-address/{addressId}")
    public ApiResponse<Boolean> updateDefaultAddress(
            @PathVariable("addressId") String addressId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        shippingAddressService.updateDefaultAddress(account, addressId);
        return ApiResponse.success(true);
    }

}
