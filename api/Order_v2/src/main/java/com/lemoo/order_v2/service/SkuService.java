/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:59 PM
 * */

package com.lemoo.order_v2.service;

import com.lemoo.order_v2.dto.response.SkuResponse;

public interface SkuService {
    SkuResponse getSkuBySkuCode(String skuCode);
}
