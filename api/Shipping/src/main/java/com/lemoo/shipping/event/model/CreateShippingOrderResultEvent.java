/*
 *  CreateShippingOrderFailed
 *  @author: pc
 *  @created 4/8/2025 11:44 PM
 * */


package com.lemoo.shipping.event.model;

import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateShippingOrderResultEvent extends Event {
    private String orderId;
    private String userId;
    private String message;
}
