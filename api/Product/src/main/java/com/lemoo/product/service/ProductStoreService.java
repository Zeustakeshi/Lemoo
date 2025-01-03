/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:52 PM
 * */

package com.lemoo.product.service;

import com.lemoo.product.dto.common.AuthenticatedAccount;
import com.lemoo.product.dto.request.ProductRequest;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;

public interface ProductStoreService {

    ProductSimpleResponse createProduct(String storeId, AuthenticatedAccount account, ProductRequest request);

    PageableResponse<ProductResponse> getAllProductByStoreId(String storeId, AuthenticatedAccount account, int page, int limit);

}
