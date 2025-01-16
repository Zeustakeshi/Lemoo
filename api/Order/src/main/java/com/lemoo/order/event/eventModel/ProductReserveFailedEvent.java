/*
 *  OrderCreatedEvent
 *  @author: Minhhieuano
 *  @created 1/16/2025 1:52 AM
 * */


package com.lemoo.order.event.eventModel;

import lombok.*;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductReserveFailedEvent extends Event {
    private String orderId;
    private Set<OrderSkuPayload> skus;
}
