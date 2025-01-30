/*
 *  OrderMapper
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:20 AM
 * */

package com.lemoo.order.mapper;

import com.lemoo.order.dto.request.OrderItemRequest;
import com.lemoo.order.dto.request.OrderRequest;
import com.lemoo.order.dto.response.OrderResponse;
import com.lemoo.order.entity.Order;
import com.lemoo.order.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface OrderMapper {
    Order toOrder(OrderRequest request);

    @Mapping(target = "skuCode", source = "lemooSku")
    OrderItem toOrderItem(OrderItemRequest request);

    OrderResponse toOrderResponse(Order order);
}
