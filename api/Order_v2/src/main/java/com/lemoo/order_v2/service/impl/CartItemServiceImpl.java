/*
 *  CartItemServiceImpl
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:41 PM
 * */

package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.common.enums.CartItemStatus;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.common.CartItemCache;
import com.lemoo.order_v2.dto.request.AddToCartRequest;
import com.lemoo.order_v2.dto.response.CartItemResponse;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.entity.CartItem;
import com.lemoo.order_v2.mapper.CartItemCacheMapper;
import com.lemoo.order_v2.mapper.CartItemMapper;
import com.lemoo.order_v2.mapper.PageMapper;
import com.lemoo.order_v2.repository.CartItemRepository;
import com.lemoo.order_v2.service.CartCacheService;
import com.lemoo.order_v2.service.CartItemCacheService;
import com.lemoo.order_v2.service.CartItemService;
import com.lemoo.order_v2.service.ProductService;
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
    private final ProductService productService;
    private final CartItemCacheMapper cartItemCacheMapper;
    private final CartItemCacheService cartItemCacheService;
    private final CartCacheService cartCacheService;
    private final CartItemMapper cartItemMapper;
    private final PageMapper pageMapper;

    @Override
    public String addToCart(AddToCartRequest request, AuthenticatedAccount account) {

        // Retrieve SKU information based on the provided SKU code from the request.
        SkuResponse sku = productService.getSkuBySkuCode(request.getLemooSku());

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

        //  Create and determine the status of the cart item cache based on stock availability.
        CartItemCache cartItemCache = cartItemCacheMapper.toCartItemCache(cartItem);
        cartItemCache.setStatus(
                isOutOfStock(cartItem.getQuantity(), sku.getStock())
                        ? CartItemStatus.OUT_OF_STOCK
                        : CartItemStatus.ACTIVE);

        // Save cart item with status to cache
        cartItemCacheService.saveToCache(cartItemCache);
        cartCacheService.addCartItemToCart(account.getUserId(), cartItem.getId());
        return cartItem.getId();
    }

    @Override
    public PageableResponse<CartItemResponse> getUserCart(int page, int limit, AuthenticatedAccount account) {
        PageRequest request = PageRequest.of(page, limit);
        Page<String> cartItemIds = cartCacheService.getCartCache(account.getUserId(), request);

        Page<CartItemResponse> responses = cartItemIds.map(cartItemId -> CompletableFuture.supplyAsync(() -> {
            CartItemCache cartItemCache = cartItemCacheService.getCartItemCache(cartItemId);
            return cartItemMapper.toCartItemResponse(cartItemCache);

        })).map(CompletableFuture::join);

        return pageMapper.toPageableResponse(responses);
    }

    private boolean isOutOfStock(Integer cartQuantity, Long available) {
        return available < cartQuantity;
    }
}
