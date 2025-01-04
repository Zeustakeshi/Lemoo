/*
 *  ProductVoucherCacheService
 *  @author: Minhhieuano
 *  @created 1/2/2025 11:12 AM
 * */


package com.lemoo.promotion.service;

import java.util.Set;

public interface VoucherCacheService {
    String generateProductVoucherKey(String sku);

    void addProductVoucherAsync(String sku, String voucherId);

    void updateVoucherProductsAsync(String sku, Set<String> vouchers);

    void addProductVoucherAsyncBulkAsync(Set<String> skus, String voucherId);
}