/*
 *  CreateShippingOrderFailed
 *  @author: pc
 *  @created 4/8/2025 11:44 PM
 * */


package com.lemoo.order_v2.event.model;

import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateShippingOrderFailedEvent extends Event {
    private String orderId;
    private String userId;
}
