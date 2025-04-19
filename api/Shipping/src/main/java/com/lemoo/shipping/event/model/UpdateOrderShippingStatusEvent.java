/*
 *  UpdateShippingStatus
 *  @author: pc
 *  @created 4/17/2025 12:40 PM
 * */


package com.lemoo.shipping.event.model;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateOrderShippingStatusEvent extends Event {
    private String orderId;
    private String userId;
    private String message;
    private ShippingStatus shippingStatus;

    public enum ShippingStatus {
        IN_TRANSIT,
        FAILED_DELIVERY,
        DELIVERED
    }
}
