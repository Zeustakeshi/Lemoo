/*
 *  InternalOrderServiceImpl
 *  @author: pc
 *  @created 4/21/2025 7:58 PM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.dto.response.OrderResponse;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.mapper.OrderMapper;
import com.lemoo.order_v2.mapper.PageMapper;
import com.lemoo.order_v2.repository.OrderRepository;
import com.lemoo.order_v2.service.InternalOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternalOrderServiceImpl implements InternalOrderService {
    private final OrderRepository orderRepository;
    private final PageMapper pageMapper;
    private final OrderMapper orderMapper;

    @Override
    public PageableResponse<OrderResponse> getAllOrders(String userId, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Order> orders = orderRepository.findAllByUserId(userId, pageRequest);
        Page<OrderResponse> orderItemResponses = orders.map(orderMapper::toOrderResponse);
        return pageMapper.toPageableResponse(orderItemResponses);
    }
}
