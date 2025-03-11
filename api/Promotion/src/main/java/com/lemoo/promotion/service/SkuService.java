/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:59 PM
 * */

package com.lemoo.promotion.service;


import com.lemoo.promotion.dto.response.SkuResponse;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

public interface SkuService {
    Optional<SkuResponse> getSkuBySkuCode(String skuCode);

    Map<String, Boolean> validateSkus(Set<String> skus);
}
