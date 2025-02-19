/*
 *  ProductController
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:11 PM
 * */


package com.lemoo.product.controller;

import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
