/*
 *  ProductCaheService
 *  @author: Minhhieuano
 *  @created 1/2/2025 3:47 PM
 * */


package com.lemoo.product.service;

import com.lemoo.product.dto.common.ProductHashCache;

public interface ProductCacheService {
    void saveProductAsync(ProductHashCache product);
}
