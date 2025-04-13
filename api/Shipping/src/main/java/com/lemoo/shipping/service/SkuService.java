/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:59 PM
 * */

package com.lemoo.shipping.service;


import com.lemoo.shipping.dto.response.SkuResponse;

import java.util.Set;

public interface SkuService {
    Set<SkuResponse> getSkuByCodes(Set<String> skuCodes);
}
