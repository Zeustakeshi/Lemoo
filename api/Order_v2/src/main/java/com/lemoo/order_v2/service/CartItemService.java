/*
 *  CartItemService
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:40 PM
 * */

package com.lemoo.order_v2.service;

import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.AddToCartRequest;

public interface CartItemService {
	String addToCart(AddToCartRequest request, AuthenticatedAccount account);
}
