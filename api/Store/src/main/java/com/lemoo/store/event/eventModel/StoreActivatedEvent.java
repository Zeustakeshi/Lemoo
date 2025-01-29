/*
 *  ApproveStoreEvent
 *  @author: Minhhieuano
 *  @created 1/28/2025 3:47 PM
 * */


package com.lemoo.store.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class StoreActivatedEvent extends Event {
    private String storeId;
}
