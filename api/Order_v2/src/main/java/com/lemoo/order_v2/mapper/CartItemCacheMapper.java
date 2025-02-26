/*
 *  CartItemCacheMapper
 *  @author: Minhhieuano
 *  @created 2/26/2025 9:58 AM
 * */


package com.lemoo.order_v2.mapper;

import com.lemoo.order_v2.common.enums.CartItemStatus;
import com.lemoo.order_v2.dto.common.CartItemCache;
import com.lemoo.order_v2.entity.CartItem;
import org.mapstruct.Mapper;

import java.util.Map;

@Mapper
public interface CartItemCacheMapper {
    CartItemCache toCartItemCache(CartItem cartItem);

    default Map<String, String> toCartItemCacheMap(CartItemCache cartItem) {
        return Map.of(
                "id", cartItem.getId(),
                "userId", cartItem.getUserId(),
                "productId", cartItem.getProductId(),
                "skuCode", cartItem.getSkuCode(),
                "quantity", cartItem.getQuantity().toString(),
                "status", cartItem.getStatus().name(),
                "storeId", cartItem.getStoreId()
        );
    }

    default CartItemCache toCartItemCache(Map<String, String> cartItemMap) {
        // Validate the input map to ensure it contains all required keys
        if (cartItemMap == null || cartItemMap.isEmpty()) {
            throw new IllegalArgumentException("The cart item map cannot be null or empty.");
        }

        // Extract values from the map and convert them to appropriate types
        String id = cartItemMap.get("id");
        String userId = cartItemMap.get("userId");
        String productId = cartItemMap.get("productId");
        String storeId = cartItemMap.get("storeId");
        String skuCode = cartItemMap.get("skuCode");
        Integer quantity = Integer.valueOf(cartItemMap.get("quantity"));
        CartItemStatus status = CartItemStatus.valueOf(cartItemMap.get("status"));

        // Construct and return a new CartItemCache object
        return CartItemCache.builder()
                .id(id)
                .userId(userId)
                .productId(productId)
                .storeId(storeId)
                .skuCode(skuCode)
                .quantity(quantity)
                .status(status)
                .build();
    }

}
