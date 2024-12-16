/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:52 PM
 * */

package com.lemoo.product.service;

import com.lemoo.product.dto.request.UpdateProductRequest;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;

public interface ProductService {

    ProductSimpleResponse createProduct(String storeId, String userId);

    ProductSimpleResponse updateProduct(String storeId, String userId, String productId, UpdateProductRequest request);

    PageableResponse<ProductResponse> getAllProductByStoreId(String storeId, String userId, int page, int limit);
}
