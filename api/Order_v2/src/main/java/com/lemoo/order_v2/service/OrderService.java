/*
 *  OrderService
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:50 PM
 * */

package com.lemoo.order_v2.service;

import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.OrderRequest;
import com.lemoo.order_v2.dto.response.OrderResponse;

public interface OrderService {
    OrderResponse placeOrder(OrderRequest request, AuthenticatedAccount account);
}
