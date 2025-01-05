/*
 *  ProductSkuCacheService
 *  @author: Minhhieuano
 *  @created 1/2/2025 4:33 PM
 * */

package com.lemoo.product.service;

import com.lemoo.product.dto.common.ProductSkuHashCache;

import java.util.List;
import java.util.Set;

public interface ProductSkuCacheService {
    void saveSkuBulkAsync(List<ProductSkuHashCache> skus);

    void addSkuToStoreAsync(String storeId, Set<String> skus);

    void addSkuToProductAsync(String productId, Set<String> sks);

    List<String> geAllSkuByProductId(String productId);

    ProductSkuHashCache getProductSkuByCode(String skuCode);
}
