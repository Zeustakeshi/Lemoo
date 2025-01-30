/*
 *  ApproveStoreEvent
 *  @author: Minhhieuano
 *  @created 1/28/2025 3:47 PM
 * */


package com.lemoo.store.event.eventModel;

import com.lemoo.store.common.enums.StoreType;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class NewStoreEvent extends Event {
    private String storeId;
    private String shortCode;
    private String name;
    private StoreType type;
    private String storeEmail;
    private String accountId;
}
