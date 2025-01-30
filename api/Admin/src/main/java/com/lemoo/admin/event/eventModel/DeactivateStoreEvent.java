/*
 *  DeactivateStoreEvent
 *  @author: Minhhieuano
 *  @created 1/30/2025 12:09 PM
 * */


package com.lemoo.admin.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class DeactivateStoreEvent extends Event {
    private String storeId;
}
