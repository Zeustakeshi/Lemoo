/*
 *  ProductController
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:02 AM
 * */

package com.lemoo.product.controller;

import com.lemoo.product.common.constants.CustomRequestHeader;
import com.lemoo.product.dto.common.AuthenticatedAccount;
import com.lemoo.product.dto.request.ProductRequest;
import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;


    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createProduct(
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @RequestBody @Valid ProductRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account) {
        return ApiResponse.success(productService.createProduct(storeId, account, request));
    }

    @GetMapping()
    public ApiResponse<?> getAllProduct(
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account) {
        return ApiResponse.success(productService.getAllProductByStoreId(storeId, account, page, limit));
    }
}
