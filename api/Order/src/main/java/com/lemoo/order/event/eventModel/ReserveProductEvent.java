/*
 *  OrderCreatedEvent
 *  @author: Minhhieuano
 *  @created 1/16/2025 1:52 AM
 * */


package com.lemoo.order.event.eventModel;

import lombok.*;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReserveProductEvent extends Event {
    private String orderId;
    private Map<String, OrderSkuPayload> skus;
}
