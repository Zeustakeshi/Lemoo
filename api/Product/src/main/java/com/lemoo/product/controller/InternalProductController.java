/*
 *  InternalProductController
 *  @author: Minhhieuano
 *  @created 3/5/2025 5:17 PM
 * */


package com.lemoo.product.controller;

import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.dto.response.InternalProductSkuResponse;
import com.lemoo.product.service.InternalProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalProductController {

    private final InternalProductService internalProductService;

    @GetMapping("/skus/{skuCode}")
    public ApiResponse<InternalProductSkuResponse> getSkuBySkuCode(
            @PathVariable("skuCode") String skuCode
    ) {
        return ApiResponse.success(internalProductService.getSkuBySkuCode(skuCode));
    }

    @PostMapping("/skus")
    public ApiResponse<Set<InternalProductSkuResponse>> getAllSkuBySkuCodes(
            @RequestBody Set<String> skus
    ) {
        return ApiResponse.success(internalProductService.getAllSkuBySkuCodes(skus));
    }
}
