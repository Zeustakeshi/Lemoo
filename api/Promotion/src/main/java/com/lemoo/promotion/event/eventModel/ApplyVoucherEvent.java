/*
 *  ApplyVoucherEvent
 *  @author: pc
 *  @created 4/8/2025 2:20 PM
 * */


package com.lemoo.promotion.event.eventModel;

import lombok.*;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplyVoucherEvent extends Event {
    private String orderId;
    private String userId;
    private Set<String> vouchers;
}
