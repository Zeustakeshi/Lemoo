/*
 *  ApplyVoucherFailedEvent
 *  @author: pc
 *  @created 4/8/2025 5:15 PM
 * */


package com.lemoo.promotion.event.eventModel;

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
