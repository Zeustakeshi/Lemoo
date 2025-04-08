/*
 *  ReserveProductEvent
 *  @author: pc
 *  @created 4/8/2025 2:23 PM
 * */


package com.lemoo.order_v2.event.model;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class ReserveProductEvent extends Event {
    private String userId;
    private String orderId;
    private Map<String, Integer> skus;
}
