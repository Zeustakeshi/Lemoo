/*
 *  BuyerOrderServiceImpl
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:27 AM
 * */


package com.lemoo.order.service.impl;

import com.lemoo.order.common.enums.OrderProcessStatus;
import com.lemoo.order.common.enums.OrderStatus;
import com.lemoo.order.dto.common.AuthenticatedAccount;
import com.lemoo.order.dto.request.OrderRequest;
import com.lemoo.order.dto.response.OrderResponse;
import com.lemoo.order.entity.Order;
import com.lemoo.order.event.eventModel.OrderCreatedEvent;
import com.lemoo.order.event.producer.PromotionProducer;
import com.lemoo.order.exception.NotfoundException;
import com.lemoo.order.mapper.OrderMapper;
import com.lemoo.order.repository.OrderItemRepository;
import com.lemoo.order.repository.OrderRepository;
import com.lemoo.order.service.BuyerOrderItemService;
import com.lemoo.order.service.BuyerOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BuyerOrderServiceImpl implements BuyerOrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderMapper orderMapper;
    private final PromotionProducer promotionProducer;
    private final BuyerOrderItemService orderItemService;

    @Override
    public OrderResponse createOrder(AuthenticatedAccount account, OrderRequest request) {
        // create new order
        Order order = orderMapper.toOrder(request);
        order.setUserId(account.getUserId());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PROCESSING);
        order.setTotalItems(request.getItems().size());
        order.setProcessStatus(OrderProcessStatus.PENDING_PROMOTION_CHECK);
        Order newOrder = orderRepository.save(order);

        orderItemService.saveOrderItems(newOrder, request.getItems());

        if (!request.getPromotions().isEmpty()) promotionProducer.checkPromotion(OrderCreatedEvent.builder()
                .orderId(newOrder.getId())
                .userId(newOrder.getUserId())
                .promotions(newOrder.getPromotions())
                .build());

        return orderMapper.toOrderResponse(newOrder);
    }

    @Override
    public Order updateOrderProcessStatus(String orderId, OrderProcessStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotfoundException("Order " + orderId + " not found"));
        order.setProcessStatus(status);
        return orderRepository.save(order);
    }

    @Override
    public void updateOrderProcessStatusAndStatus(String orderId, OrderProcessStatus processStatus, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotfoundException("Order " + orderId + " not found"));
        order.setProcessStatus(processStatus);
        order.setStatus(status);
        orderRepository.save(order);
    }
}


