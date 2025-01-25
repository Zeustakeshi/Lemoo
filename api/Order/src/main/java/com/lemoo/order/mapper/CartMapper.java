/*
 *  CartMapper
 *  @author: Minhhieuano
 *  @created 1/26/2025 12:26 AM
 * */


package com.lemoo.order.mapper;

import com.lemoo.order.dto.response.CartItemResponse;
import com.lemoo.order.dto.response.CartItemSkuResponse;
import com.lemoo.order.dto.response.CartResponse;
import com.lemoo.order.entity.Cart;
import com.lemoo.order.entity.CartItem;
import com.lemoo.order.entity.CartItemSku;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface CartMapper {
    CartResponse toCartResponse(Cart cart);

    CartItemResponse toCartItemResponse(CartItem cartItem);

    @Mapping(source = "skuCode", target = "lemooSku")
    CartItemSkuResponse toCartItemSkuResponse(CartItemSku sku);
}
