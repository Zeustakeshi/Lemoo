/*
 *  ProductController
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:11 PM
 * */


package com.lemoo.product.controller;

import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buyer")
@RequiredArgsConstructor
public class BuyerProductController {
    private final ProductService productService;

    @GetMapping("{productId}")
    public ApiResponse<?> getProductById(
            @PathVariable("productId") String productId
    ) {
        return ApiResponse.success(productService.getProductById(productId));
    }

    @GetMapping("/store/{storeId}")
    public ApiResponse<?> getProductByStoreId(
            @PathVariable("storeId") String storeId,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit
    ) {
        return ApiResponse.success(productService.getProductByStoreId(storeId, page, limit));
    }
}
