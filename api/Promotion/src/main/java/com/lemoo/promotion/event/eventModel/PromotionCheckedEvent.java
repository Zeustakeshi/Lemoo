/*
 *  OrderCreatedEvent
 *  @author: Minhhieuano
 *  @created 1/16/2025 1:52 AM
 * */


package com.lemoo.promotion.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PromotionCheckedEvent extends Event {
    private String orderId;
}
