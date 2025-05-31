/*
 *  NewVoucherShareTransaction
 *  @author: pc
 *  @created 4/21/2025 1:10 PM
 * */


package com.lemoo.promotion.event.eventModel;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@Data
public class NewShareVoucherEvent extends Event {
    private String voucherId;
    private String userId;
    private String targetId;
    private String transactionId;
    private String chatId;
}
