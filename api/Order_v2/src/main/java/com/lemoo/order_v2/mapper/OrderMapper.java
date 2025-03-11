/*
 *  OrderMapper
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:44 AM
 * */

package com.lemoo.order_v2.mapper;

import com.lemoo.order_v2.dto.response.OrderItemResponse;
import com.lemoo.order_v2.dto.response.OrderResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;

@Mapper
public abstract class OrderMapper {

    @Autowired
    private ShippingAddressMapper shippingAddressMapper;


    @Mapping(source = "skuCode", target = "lemooSku")
    public abstract OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    public OrderResponse toOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .items(
                        order.getItems()
                                .stream()
                                .map(this::toOrderItemResponse)
                                .collect(Collectors.toSet()
                                )
                ).total(order.getTotal())
                .shippingAddress(
                        shippingAddressMapper
                                .toShippingAddressResponse(order.getShippingAddress()))
                .paymentMethod(order.getPaymentMethod())
                .createdAt(order.getCreatedAt())
                .build();
    }

}
