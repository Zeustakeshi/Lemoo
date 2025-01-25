/*
 *  CartService
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:56 AM
 * */

package com.lemoo.order.service;

import com.lemoo.order.dto.response.CartResponse;
import com.lemoo.order.entity.Cart;

public interface CartService {
    Cart initCart(String userId);

    CartResponse getUserCart(String userId);
}
