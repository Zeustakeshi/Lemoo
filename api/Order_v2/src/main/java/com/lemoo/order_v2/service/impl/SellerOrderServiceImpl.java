/*
 *  SellerOrderServiceImpl
 *  @author: pc
 *  @created 3/26/2025 10:54 AM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.dto.response.SellerOrderResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.event.model.NewShippingOrderEvent;
import com.lemoo.order_v2.event.producer.ShippingProducer;
import com.lemoo.order_v2.exception.ForbiddenException;
import com.lemoo.order_v2.exception.NotfoundException;
import com.lemoo.order_v2.mapper.PageMapper;
import com.lemoo.order_v2.mapper.SellerOrderMapper;
import com.lemoo.order_v2.repository.OrderRepository;
import com.lemoo.order_v2.service.SellerOrderService;
import com.lemoo.order_v2.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SellerOrderServiceImpl implements SellerOrderService {

    private final OrderRepository orderRepository;
    private final StoreService storeService;
    private final SellerOrderMapper sellerOrderMapper;
    private final PageMapper pageMapper;
    private final ShippingProducer shippingProducer;

    @Override
    public PageableResponse<SellerOrderResponse> getAllOrderByStoreId(String storeId, OrderStatus status, int page, int limit, AuthenticatedAccount account) {
        storeService.verifyStore(account.getId(), storeId);

        PageRequest request = PageRequest.of(page, limit, Sort.Direction.ASC, "createdAt");
        Page<Order> orders = orderRepository.findAllByStoreIdAndStatus(storeId, status, request);

        Page<SellerOrderResponse> sellerOrderResponses = orders.map(sellerOrderMapper::toOrderResponse);

        return pageMapper.toPageableResponse(sellerOrderResponses);
    }

    @Override
    public void packedOrder(String orderId, String storeId, AuthenticatedAccount account) {
        storeService.verifyStore(account.getId(), storeId);

        Order order = findOrderOrThrow(orderId);

        validateOrderStatusForPacked(order);

        order.setStatus(OrderStatus.SHIPPED);

        Map<String, Integer> shippingOrderSku = new HashMap<>();

        order.getItems().forEach(orderItem -> {
            shippingOrderSku.put(orderItem.getSkuCode(), orderItem.getQuantity());
        });

        shippingProducer.createShippingOrder(NewShippingOrderEvent.builder()
                .orderId(orderId)
                .shippingAddressId(order.getShippingAddress().getId())
                .skus(shippingOrderSku)
                .storeId(storeId)
                .userId(account.getUserId())
                .build());

        orderRepository.save(order);
    }

    @Override
    public void confirmOrder(String orderId, String storeId, AuthenticatedAccount account) {
        storeService.verifyStore(account.getId(), storeId);

        Order order = findOrderOrThrow(orderId);

        validateOrderStatusForConfirmation(order);

        order.setStatus(OrderStatus.CONFIRMED);

        orderRepository.save(order);
    }

    @Override
    public void cancelOrder(String orderId, String storeId, AuthenticatedAccount account) {
        storeService.verifyStore(account.getId(), storeId);

        Order order = findOrderOrThrow(orderId);

        validateOrderStatusForCancellation(order);

        order.setStatus(OrderStatus.CANCELLED);

        orderRepository.save(order);
    }

    private Order findOrderOrThrow(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new NotfoundException("Order " + orderId + " not found!"));
    }

    private void validateOrderStatusForPacked(Order order) {
        if (!order.getStatus().equals(OrderStatus.CONFIRMED)) {
            throw new ForbiddenException("Cannot pack order. Order must be in CONFIRMED status.");
        }
    }

    private void validateOrderStatusForConfirmation(Order order) {
        if (!order.getStatus().equals(OrderStatus.PENDING)) {
            throw new ForbiddenException("Cannot confirm order. Order must be in PENDING status.");
        }
    }

    private void validateOrderStatusForCancellation(Order order) {
        Set<OrderStatus> cancellableStatuses = EnumSet.of(
                OrderStatus.UN_PAID,
                OrderStatus.PENDING,
                OrderStatus.CONFIRMED,
                OrderStatus.PACKED
        );

        if (!cancellableStatuses.contains(order.getStatus())) {
            throw new ForbiddenException("Cannot cancel order. Order status is not cancellable.");
        }
    }
}
