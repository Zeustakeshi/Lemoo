/*
 *  ReserveProductEvent
 *  @author: pc
 *  @created 4/8/2025 2:23 PM
 * */


package com.lemoo.product.event.eventModel;

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
