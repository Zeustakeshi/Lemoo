/*
 *  CartItemServiceImpl
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:41 PM
 * */

package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.request.AddToCartRequest;
import com.lemoo.order_v2.dto.response.CartItemResponse;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.entity.CartItem;
import com.lemoo.order_v2.exception.NotfoundException;
import com.lemoo.order_v2.mapper.CartItemMapper;
import com.lemoo.order_v2.mapper.PageMapper;
import com.lemoo.order_v2.repository.CartItemRepository;
import com.lemoo.order_v2.service.CartItemService;
import com.lemoo.order_v2.service.SkuService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {
    private final CartItemRepository cartItemRepository;
    private final SkuService skuService;
    private final CartItemMapper cartItemMapper;
    private final PageMapper pageMapper;

    @Override
    public String addToCart(AddToCartRequest request, AuthenticatedAccount account) {

        // Retrieve SKU information based on the provided SKU code from the request.
        Optional<SkuResponse> skuResponseOptional = skuService.getSkuBySkuCode(request.getLemooSku());

        if (skuResponseOptional.isEmpty()) {
            throw new NotfoundException("Sku " + request.getLemooSku() + " not found");
        }

        SkuResponse sku = skuResponseOptional.get();

        // Check if the cart item already exists for the user and SKU.
        Optional<CartItem> cartItemOptional =
                cartItemRepository.findByUserIdAndSkuCode(account.getUserId(), sku.getSkuCode());

        CartItem cartItem;

        if (cartItemOptional.isPresent()) {
            //  If the cart item exists, update its quantity by adding the requested quantity.
            cartItem = cartItemOptional.get();
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        } else {
            //  If the cart item does not exist, create a new one with the provided details.
            cartItem = CartItem.builder()
                    .productId(sku.getProductId())
                    .skuCode(sku.getSkuCode())
                    .storeId(sku.getStoreId())
                    .userId(account.getUserId())
                    .quantity(request.getQuantity())
                    .build();
        }

        // Save the updated or newly created cart item to the repository.
        cartItemRepository.save(cartItem);

        return cartItem.getId();
    }

    @Override
    public PageableResponse<CartItemResponse> getUserCart(int page, int limit, AuthenticatedAccount account) {
        PageRequest request = PageRequest.of(page, limit);

        Page<CartItem> cartItems = cartItemRepository.findAllByUserId(account.getUserId(), request);

        Page<CartItemResponse> responses = cartItems.map(cartItem -> CompletableFuture
                        .supplyAsync(() -> cartItemMapper.toCartItemResponse(cartItem)))
                .map(CompletableFuture::join);
        return pageMapper.toPageableResponse(responses);
    }

}
