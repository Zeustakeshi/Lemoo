/*
 *  ApplyVoucherResultEvent
 *  @author: pc
 *  @created 4/8/2025 5:26 PM
 * */


package com.lemoo.order_v2.event.model;


import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplyVoucherResultEvent extends Event {
    private String orderId;
    private String userId;
    private String message;
}

