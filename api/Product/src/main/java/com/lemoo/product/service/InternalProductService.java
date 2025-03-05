/*
 *  InternalProductService
 *  @author: Minhhieuano
 *  @created 3/5/2025 4:31 PM
 * */


package com.lemoo.product.service;

import com.lemoo.product.dto.response.InternalProductSkuResponse;

import java.util.Set;

public interface InternalProductService {
    InternalProductSkuResponse getSkuBySkuCode(String skuCode);

    Set<InternalProductSkuResponse> getAllSkuBySkuCodes(Set<String> skuCode);
}
