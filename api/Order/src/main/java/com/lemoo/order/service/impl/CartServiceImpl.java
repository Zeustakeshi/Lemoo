/*
 *  CartServiceImpl
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:56 AM
 * */


package com.lemoo.order.service.impl;

import com.lemoo.order.repository.CartItemPromotionRepository;
import com.lemoo.order.repository.CartItemRepository;
import com.lemoo.order.repository.CartItemSkuRepository;
import com.lemoo.order.repository.CartRepository;
import com.lemoo.order.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CartItemSkuRepository cartItemSkuRepository;
    private final CartItemPromotionRepository cartItemPromotionRepository;

    
}
