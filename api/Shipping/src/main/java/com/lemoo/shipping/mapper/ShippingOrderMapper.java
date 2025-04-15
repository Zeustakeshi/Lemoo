/*
 *  ShippingOrderMapper
 *  @author: pc
 *  @created 4/14/2025 11:38 PM
 * */

package com.lemoo.shipping.mapper;

import com.lemoo.shipping.common.enums.ShippingOrderStatus;
import com.lemoo.shipping.dto.response.GhnShippingOrderResponse;
import com.lemoo.shipping.dto.response.ShippingOrderResponse;
import com.lemoo.shipping.entity.ShippingOrder;
import com.lemoo.shipping.entity.ShippingOrderLog;
import org.mapstruct.*;

@Mapper
public interface ShippingOrderMapper {

    @Mapping(source = "codAmount", target = "totalAmount")
    ShippingOrderResponse toShippingOrderResponse(ShippingOrder shippingOrder);

    @Mapping(source = "data.content", target = "content")
    @Mapping(source = "data.order_code", target = "shippingOrderCode")
    @Mapping(source = "data.cod_amount", target = "codAmount")
    @Mapping(source = "data.order_date", target = "orderDate")
    @Mapping(source = "data.finish_date", target = "finishDate")
    @Mapping(source = "data.pickup_time", target = "pickupTime")
    @Mapping(source = "data.leadtime_order", target = "leadtimeOrder")
    @Mapping(source = "data.logs", target = "logs")
    @Mapping(source = "data.leadtime", target = "expectedDeliveryTime")
    @Mapping(source = "data.status", target = "status", qualifiedByName = "mapStatus")
    @Mapping(target = "totalFee", ignore = true)
    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "userId", ignore = true)
    ShippingOrder toShippingOrder(GhnShippingOrderResponse ghnShippingOrderResponse);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "data.content", target = "content")
    @Mapping(source = "data.order_code", target = "shippingOrderCode")
    @Mapping(source = "data.cod_amount", target = "codAmount")
    @Mapping(source = "data.order_date", target = "orderDate")
    @Mapping(source = "data.finish_date", target = "finishDate")
    @Mapping(source = "data.pickup_time", target = "pickupTime")
    @Mapping(source = "data.leadtime_order", target = "leadtimeOrder")
    @Mapping(source = "data.logs", target = "logs")
    @Mapping(source = "data.leadtime", target = "expectedDeliveryTime")
    @Mapping(source = "data.status", target = "status", qualifiedByName = "mapStatus")
    @Mapping(target = "totalFee", ignore = true)
    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "userId", ignore = true)
    void updateShippingOrder(GhnShippingOrderResponse shippingOrderResponse, @MappingTarget ShippingOrder shippingOrder);

    @Named("mapStatus")
    default ShippingOrderStatus mapStatus(String status) {
        return ShippingOrderStatus.fromApiValue(status);
    }

    @Mapping(source = "trip_code", target = "tripCode")
    @Mapping(source = "updated_date", target = "updatedDate")
    @Mapping(source = "status", target = "status", qualifiedByName = "mapStatus")
    ShippingOrderLog toShippingOrderLog(GhnShippingOrderResponse.Log log);
}
