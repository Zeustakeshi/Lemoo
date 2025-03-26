/*
 *  SellerOrderServiceImpl
 *  @author: pc
 *  @created 3/26/2025 10:54 AM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.dto.response.SellerOrderResponse;
import com.lemoo.order_v2.entity.Order;
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

@Service
@RequiredArgsConstructor
public class SellerOrderServiceImpl implements SellerOrderService {

    private final OrderRepository orderRepository;
    private final StoreService storeService;
    private final SellerOrderMapper sellerOrderMapper;
    private final PageMapper pageMapper;

    @Override
    public PageableResponse<SellerOrderResponse> getAllOrderByStoreId(String storeId, int page, int limit, AuthenticatedAccount account) {
        storeService.verifyStore(account.getId(), storeId);

        PageRequest request = PageRequest.of(page, limit, Sort.Direction.ASC, "createdAt");
        Page<Order> orders = orderRepository.findAllByStoreId(storeId, request);

        Page<SellerOrderResponse> sellerOrderResponses = orders.map(sellerOrderMapper::toOrderResponse);

        return pageMapper.toPageableResponse(sellerOrderResponses);
    }
}
