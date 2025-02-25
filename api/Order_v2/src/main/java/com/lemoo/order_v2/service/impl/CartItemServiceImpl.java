/*
 *  CartItemServiceImpl
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:41 PM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.repository.CartItemRepository;
import com.lemoo.order_v2.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {
    private final CartItemRepository cartItemRepository;
}
