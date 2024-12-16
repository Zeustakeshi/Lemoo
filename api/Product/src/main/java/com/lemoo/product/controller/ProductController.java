/*
 *  ProductController
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:02 AM
 * */

package com.lemoo.product.controller;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.product.dto.request.UpdateProductRequest;
import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private static final String STORE_ID_REQUEST_HEADER = "X-Store-Id";

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createProduct(@RequestHeader(STORE_ID_REQUEST_HEADER) String storeId) {
        String fakeUserId = NanoIdUtils.randomNanoId();
        return ApiResponse.success(productService.createProduct(storeId, fakeUserId));
    }

    @PutMapping("{productId}")
    public ApiResponse<?> updateProduct(
            @RequestHeader(STORE_ID_REQUEST_HEADER) String storeId,
            @PathVariable("productId") String productId,
            @RequestBody @Valid UpdateProductRequest request
    ) {
        String fakeUserId = NanoIdUtils.randomNanoId();
        return ApiResponse.success(productService.updateProduct(storeId, fakeUserId, productId, request));
    }

    @GetMapping()
    public ApiResponse<?> getAllProduct(
            @RequestHeader(STORE_ID_REQUEST_HEADER) String storeId,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit
    ) {
        String fakeUserId = NanoIdUtils.randomNanoId();
        return ApiResponse.success(productService.getAllProductByStoreId(storeId, fakeUserId, page, limit));
    }
}
