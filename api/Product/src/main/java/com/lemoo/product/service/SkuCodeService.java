/*
 *  SkuCodeService
 *  @author: Minhhieuano
 *  @created 12/29/2024 11:10 AM
 * */

package com.lemoo.product.service;

import java.util.List;

public interface SkuCodeService {
    String generateCategorySku();

    String generateProductSku(String categoryCode, List<String> skuVariant);
}
