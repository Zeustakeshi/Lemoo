/*
 *  ReserveProductEvent
 *  @author: pc
 *  @created 4/8/2025 2:23 PM
 * */


package com.lemoo.order_v2.event.model;

import lombok.*;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReserveProductEvent extends Event {
    private String userId;
    private String orderId;
    private Map<String, Integer> skus;
}
