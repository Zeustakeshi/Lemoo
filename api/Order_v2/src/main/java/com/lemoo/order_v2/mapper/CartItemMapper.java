/*
 *  CartItemMapper
 *  @author: Minhhieuano
 *  @created 2/26/2025 11:20 AM
 * */


package com.lemoo.order_v2.mapper;


import com.lemoo.order_v2.dto.common.CartItemCache;
import com.lemoo.order_v2.dto.response.CartItemResponse;
import com.lemoo.order_v2.dto.response.CartSkuResponse;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.service.ProductService;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
public abstract class CartItemMapper {
    @Autowired
    private ProductService productService;

    public CartItemResponse toCartItemResponse(CartItemCache cartItemCache) {
        SkuResponse skuResponse = productService.getSkuBySkuCode(cartItemCache.getSkuCode());
        return CartItemResponse.builder()
                .id(cartItemCache.getId())
                .productId(cartItemCache.getProductId())
                .quantity(cartItemCache.getQuantity())
                .status(cartItemCache.getStatus())
                .storeId(cartItemCache.getStoreId())
                .sku(CartSkuResponse.builder()
                        .lemooSku(cartItemCache.getSkuCode())
                        .image(skuResponse.getImage())
                        .name(skuResponse.getName())
                        .price(skuResponse.getPrice())
                        .build())
                .build();
    }
}
