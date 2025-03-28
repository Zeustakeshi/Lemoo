/*
 *  ShippingAddressController
 *  @author: pc
 *  @created 3/29/2025 12:04 AM
 * */


package com.lemoo.shipping.controller;

import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.entity.BasePartialAddress;
import com.lemoo.shipping.service.ShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class ShippingAddressController {
    private final ShippingAddressService shippingAddressService;


    @GetMapping("/provinces")
    public ApiResponse<List<BasePartialAddress>> getProvinces() {
        return ApiResponse.success(shippingAddressService.getProvinces());
    }

    @GetMapping("/districts")
    public ApiResponse<List<BasePartialAddress>> getDistricts(
            @RequestParam("provinceCode") String provinceCode
    ) {
        return ApiResponse.success(shippingAddressService.getDistricts(provinceCode));
    }

    @GetMapping("/wards")
    public ApiResponse<List<BasePartialAddress>> getWards(
            @RequestParam("districtCode") String districtCode
    ) {
        return ApiResponse.success(shippingAddressService.getWards(districtCode));
    }

}
