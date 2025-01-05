/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:25 PM
 * */


package com.lemoo.product.service;

import com.lemoo.product.dto.response.ProductDetailResponse;

public interface ProductService {
    ProductDetailResponse getProductById(String productId);
}
