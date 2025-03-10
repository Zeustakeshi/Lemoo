/*
 *  CartItemMapper
 *  @author: Minhhieuano
 *  @created 2/26/2025 11:20 AM
 * */


package com.lemoo.order_v2.mapper;


import com.lemoo.order_v2.common.enums.CartItemStatus;
import com.lemoo.order_v2.dto.response.CartItemResponse;
import com.lemoo.order_v2.dto.response.CartSkuResponse;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.entity.CartItem;
import com.lemoo.order_v2.exception.NotfoundException;
import com.lemoo.order_v2.service.SkuService;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Mapper
public abstract class CartItemMapper {
    @Autowired
    private SkuService skuService;

    public CartItemResponse toCartItemResponse(CartItem cartItem) {
        Optional<SkuResponse> skuResponseOptional = skuService.getSkuBySkuCode(cartItem.getSkuCode());

        if (skuResponseOptional.isEmpty()) {
            throw new NotfoundException("Sku " + cartItem.getSkuCode() + " not found");
        }

        SkuResponse skuResponse = skuResponseOptional.get();

        CartItemStatus status = skuResponse.getStock() < cartItem.getQuantity() ?
                CartItemStatus.OUT_OF_STOCK :
                CartItemStatus.ACTIVE;

        return CartItemResponse.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProductId())
                .quantity(cartItem.getQuantity())
                .status(status)
                .storeId(cartItem.getStoreId())
                .sku(CartSkuResponse.builder()
                        .lemooSku(cartItem.getSkuCode())
                        .image(skuResponse.getImage())
                        .name(skuResponse.getName())
                        .price(skuResponse.getPrice())
                        .build())
                .build();
    }

}
