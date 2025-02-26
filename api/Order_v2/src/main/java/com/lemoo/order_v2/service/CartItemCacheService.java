/*
 *  CartCacheService
 *  @author: Minhhieuano
 *  @created 2/26/2025 9:56 AM
 * */


package com.lemoo.order_v2.service;

import com.lemoo.order_v2.dto.common.CartItemCache;

public interface CartItemCacheService {
    void saveToCache(CartItemCache cartItemCache);
}
