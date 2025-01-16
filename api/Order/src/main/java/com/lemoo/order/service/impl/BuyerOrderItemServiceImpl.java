/*
 *  BuyerOrderItemServiceImpl
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:53 AM
 * */


package com.lemoo.order.service.impl;

import com.lemoo.order.dto.request.OrderItemRequest;
import com.lemoo.order.entity.Order;
import com.lemoo.order.entity.OrderItem;
import com.lemoo.order.mapper.OrderMapper;
import com.lemoo.order.repository.OrderItemRepository;
import com.lemoo.order.service.BuyerOrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class BuyerOrderItemServiceImpl implements BuyerOrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderMapper orderMapper;

    @Override
    public void saveOrderItems(Order order, Set<OrderItemRequest> items) {
        orderItemRepository.saveAll(
                items.stream().map(item -> {
                    var orderItem = orderMapper.toOrderItem(item);
                    orderItem.setOrder(order);
                    return orderItem;
                }).toList()
        );
    }

    @Override
    public Set<OrderItem> findAllByOrderId(String orderId) {
        return orderItemRepository.findAllByOrderId(orderId);
    }
}
