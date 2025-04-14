/*
 *  ShippingOrderMapper
 *  @author: pc
 *  @created 4/14/2025 11:38 PM
 * */

package com.lemoo.shipping.mapper;

import com.lemoo.shipping.dto.response.GhnShippingOrderResponse;
import com.lemoo.shipping.entity.ShippingOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ShippingOrderMapper {
    @Mapping(source = "data.order_code", target = "shippingOrderCode")
    @Mapping(source = "data.total_fee", target = "totalFee")
    @Mapping(target = "expectedDeliveryTime", ignore = true)
    ShippingOrder toShippingOrder(GhnShippingOrderResponse ghnShippingOrderResponse);
}
