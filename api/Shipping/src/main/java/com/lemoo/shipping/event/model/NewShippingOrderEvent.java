/*
 *  NewShippingOrderEvent
 *  @author: pc
 *  @created 4/8/2025 11:40 PM
 * */


package com.lemoo.shipping.event.model;

import lombok.*;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewShippingOrderEvent extends Event {
    private Map<String, Integer> skus;
    private String orderId;
    private String storeId;
    private String userId;
    private String shippingAddressId;
}
