/*
 *  OrderCreatedEvent
 *  @author: Minhhieuano
 *  @created 1/18/2025 3:35 PM
 * */


package com.lemoo.promotion.event.eventModel;

import lombok.*;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OrderCreatedEvent extends Event {
    private String orderId;
    private Set<String> promotions;
    private String userId;
}

