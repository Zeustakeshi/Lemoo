/*
 *  BuyerOrderItemService
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:52 AM
 * */


package com.lemoo.order.service;

import com.lemoo.order.dto.request.OrderItemRequest;
import com.lemoo.order.entity.Order;
import com.lemoo.order.entity.OrderItem;

import java.util.Set;

public interface BuyerOrderItemService {
    void saveOrderItems(Order order, Set<OrderItemRequest> items);

    Set<OrderItem> findAllByOrderId(String orderId);
}
