/*
 *  OrderMapper
 *  @author: pc
 *  @created 4/15/2025 5:00 PM
 * */


package com.lemoo.order_v2.mapper;

import com.lemoo.order_v2.dto.response.OrderItemResponse;
import com.lemoo.order_v2.dto.response.OrderResponse;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {ShippingAddressMapper.class})
public interface OrderMapper {


    @Mapping(source = "createdAt", target = "orderDate")
    OrderResponse toOrderResponse(Order order);

    @Mapping(source = "skuCode", target = "lemooSku")
    @Mapping(source = "skuName", target = "name")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);
}
