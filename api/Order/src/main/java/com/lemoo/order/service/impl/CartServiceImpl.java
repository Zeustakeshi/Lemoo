/*
 *  CartServiceImpl
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:56 AM
 * */


package com.lemoo.order.service.impl;

import com.lemoo.order.dto.response.CartItemResponse;
import com.lemoo.order.dto.response.CartItemSkuResponse;
import com.lemoo.order.dto.response.CartResponse;
import com.lemoo.order.entity.Cart;
import com.lemoo.order.entity.CartItem;
import com.lemoo.order.entity.CartItemSku;
import com.lemoo.order.exception.ConflictException;
import com.lemoo.order.mapper.CartMapper;
import com.lemoo.order.repository.CartItemPromotionRepository;
import com.lemoo.order.repository.CartItemRepository;
import com.lemoo.order.repository.CartItemSkuRepository;
import com.lemoo.order.repository.CartRepository;
import com.lemoo.order.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CartItemSkuRepository cartItemSkuRepository;
    private final CartItemPromotionRepository cartItemPromotionRepository;
    private final CartMapper cartMapper;

    @Override
    public Cart initCart(String userId) {
        if (cartRepository.existsByUserId(userId)) {
            throw new ConflictException("User cart already existed");
        }
        return cartRepository.save(Cart
                .builder()
                .userId(userId)
                .build());
    }

    @Override
    public CartResponse getUserCart(String userId) {
        Cart cart = cartRepository
                .findByUserId(userId)
                .orElseGet(() -> initCart(userId));

        List<CartItem> cartItems = cartItemRepository.findAllByCartId(cart.getId());

        List<CartItemResponse> cartItemResponses = cartItems.stream().map(cartItem -> CompletableFuture.supplyAsync(() -> {
            CartItemResponse cartItemResponse = cartMapper.toCartItemResponse(cartItem);
            List<CartItemSku> skus = cartItemSkuRepository.findAllByCartItemId(cartItem.getId());
            List<CartItemSkuResponse> skuResponses = skus.stream().map(cartMapper::toCartItemSkuResponse).toList();
            cartItemResponse.setSkus(skuResponses);
            return cartItemResponse;
        })).map(CompletableFuture::join).toList();

        CartResponse cartResponse = cartMapper.toCartResponse(cart);
        cartResponse.setItems(cartItemResponses);
        return cartResponse;
    }
}
