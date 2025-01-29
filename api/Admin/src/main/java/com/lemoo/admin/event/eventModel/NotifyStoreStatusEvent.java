/*
 *  ApproveStoreEvent
 *  @author: Minhhieuano
 *  @created 1/28/2025 3:47 PM
 * */


package com.lemoo.admin.event.eventModel;

import com.lemoo.admin.common.enums.StoreStatus;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NotifyStoreStatusEvent extends Event {
    private String email;
    private StoreStatus status;
}
