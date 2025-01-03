/*
 *  ProductRecommendService
 *  @author: Minhhieuano
 *  @created 1/4/2025 12:08 AM
 * */


package com.lemoo.product.service;

import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductFeatureResponse;

public interface ProductRecommendService {
    PageableResponse<ProductFeatureResponse> getProductFeature(int page, int limit);
}
