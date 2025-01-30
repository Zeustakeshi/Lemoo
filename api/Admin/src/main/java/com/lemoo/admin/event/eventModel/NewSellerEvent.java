/*
 *  ApproveStoreEvent
 *  @author: Minhhieuano
 *  @created 1/28/2025 3:47 PM
 * */


package com.lemoo.admin.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NewSellerEvent extends Event {
    private String accountId;
}
