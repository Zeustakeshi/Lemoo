/*
 *  ShippingOrderResponse
 *  @author: pc
 *  @created 4/15/2025 9:57 AM
 * */


package com.lemoo.shipping.dto.response;

import com.lemoo.shipping.common.enums.ShippingOrderStatus;
import com.lemoo.shipping.entity.ShippingOrder;
import com.lemoo.shipping.entity.ShippingOrderLog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShippingOrderResponse {
    private String content;
    private String shippingOrderCode;
    private Long totalAmount;
    private String orderId;
    private String shippingAddressId;
    
    @Builder.Default
    private Set<ShippingOrderLog> logs = new HashSet<>();
    private ShippingOrder.LeadtimeOrder leadtimeOrder;
    private ShippingOrderStatus status;
}
