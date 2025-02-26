/*
 *  CartItemService
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:40 PM
 * */

package com.lemoo.order_v2.service;

import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.AddToCartRequest;
import com.lemoo.order_v2.dto.response.CartItemResponse;
import com.lemoo.order_v2.dto.response.PageableResponse;

public interface CartItemService {
    String addToCart(AddToCartRequest request, AuthenticatedAccount account);

    PageableResponse<CartItemResponse> getUserCart(int page, int limit, AuthenticatedAccount account);
}
