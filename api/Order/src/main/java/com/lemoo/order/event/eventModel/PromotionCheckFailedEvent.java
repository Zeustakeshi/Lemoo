/*
 *  OrderCreatedEvent
 *  @author: Minhhieuano
 *  @created 1/16/2025 1:52 AM
 * */


package com.lemoo.order.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PromotionCheckFailedEvent extends Event {
    private String orderId;
}
