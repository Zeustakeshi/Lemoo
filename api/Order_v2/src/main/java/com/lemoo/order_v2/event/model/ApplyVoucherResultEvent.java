/*
 *  ApplyVoucherResultEvent
 *  @author: pc
 *  @created 4/8/2025 5:26 PM
 * */


package com.lemoo.order_v2.event.model;


import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class ApplyVoucherResultEvent extends Event {
    private String orderId;
    private String userId;
    private String message;
}

