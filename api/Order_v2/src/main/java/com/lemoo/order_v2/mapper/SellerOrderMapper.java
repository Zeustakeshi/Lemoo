/*
 *  OrderMapper
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:44 AM
 * */

package com.lemoo.order_v2.mapper;

import com.lemoo.order_v2.dto.response.SellerOrderItemResponse;
import com.lemoo.order_v2.dto.response.SellerOrderResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public abstract class SellerOrderMapper {

    @Mapping(source = "skuCode", target = "lemooSku")
    public abstract SellerOrderItemResponse toOrderItemResponse(OrderItem orderItem);

    public SellerOrderResponse toOrderResponse(Order order) {

        Set<SellerOrderItemResponse> orderItems = order.getItems()
                .stream().map(this::toOrderItemResponse)
                .collect(Collectors.toSet());

        return SellerOrderResponse.builder()
                .id(order.getId())
                .paymentMethod(order.getPaymentMethod())
                .orderDate(order.getCreatedAt())
                .vouchers(order.getVouchers())
                .items(orderItems)
                .build();
    }

}
