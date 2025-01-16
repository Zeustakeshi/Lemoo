/*
 *  BuyerOrderService
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:27 AM
 * */

package com.lemoo.order.service;

import com.lemoo.order.common.enums.OrderProcessStatus;
import com.lemoo.order.common.enums.OrderStatus;
import com.lemoo.order.dto.common.AuthenticatedAccount;
import com.lemoo.order.dto.request.OrderRequest;
import com.lemoo.order.dto.response.OrderResponse;
import com.lemoo.order.entity.Order;

public interface BuyerOrderService {
    OrderResponse createOrder(AuthenticatedAccount account, OrderRequest request);

    Order updateOrderProcessStatus(String orderId, OrderProcessStatus status);

    void updateOrderProcessStatusAndStatus(String orderId, OrderProcessStatus processStatus, OrderStatus status);
}
