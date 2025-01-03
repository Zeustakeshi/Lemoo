/*
 *  ProductRecommendController
 *  @author: Minhhieuano
 *  @created 1/4/2025 12:06 AM
 * */


package com.lemoo.product.controller;

import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.service.ProductRecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products/recommend")
@RequiredArgsConstructor
public class ProductRecommendController {

    private final ProductRecommendService productRecommendService;

    @GetMapping("feature")
    public ApiResponse<?> getProductFeature(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit
    ) {
        return ApiResponse.success(productRecommendService.getProductFeature(page, limit));
    }
}
