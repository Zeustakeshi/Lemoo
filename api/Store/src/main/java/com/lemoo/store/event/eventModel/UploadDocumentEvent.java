/*
 *  UploadImageEvent
 *  @author: Minhhieuano
 *  @created 12/10/2024 8:53 PM
 * */


package com.lemoo.store.event.eventModel;

import com.lemoo.store.common.enums.DocumentType;
import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UploadDocumentEvent extends Event {

    private DocumentType type;
    private byte[] image;
    private String storeId;

    @Override
    protected void setGroupId(String groupId) {
        this.groupId = "LE_001";
    }
}
