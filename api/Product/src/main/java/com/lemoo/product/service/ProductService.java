/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:25 PM
 * */


package com.lemoo.product.service;

import com.lemoo.product.dto.common.AuthenticatedAccount;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductDetailResponse;
import com.lemoo.product.dto.response.ProductResponse;

public interface ProductService {
    ProductDetailResponse getProductById(String productId);

    PageableResponse<ProductResponse> getProductByStoreId(String storeId, int page, int limit, AuthenticatedAccount account);
}
