/*
 *  CartCacheService
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:47 AM
 * */


package com.lemoo.order_v2.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CartCacheService {
    void addCartItemToCart(String userId, String cartItemId);

    Page<String> getCartCache(String userId, Pageable pageable);
}
