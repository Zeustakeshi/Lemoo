/*
 *  ApplyVoucherFailedEvent
 *  @author: pc
 *  @created 4/8/2025 5:15 PM
 * */


package com.lemoo.promotion.event.eventModel;

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
