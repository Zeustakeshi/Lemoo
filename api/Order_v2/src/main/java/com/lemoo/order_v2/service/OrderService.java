/*
 *  OrderService
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:50 PM
 * */

package com.lemoo.order_v2.service;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.OrderRequest;
import com.lemoo.order_v2.entity.Order;

public interface OrderService {
    void placeOrder(OrderRequest request, AuthenticatedAccount account);

    void updateOrderStatus(String userId, String orderId, OrderStatus status);

    Order findByIdAndUserId(String orderId, String userId);
}
