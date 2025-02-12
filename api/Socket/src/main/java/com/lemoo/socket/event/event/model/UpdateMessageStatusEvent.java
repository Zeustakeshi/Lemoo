/*
 *  UpdateMessageStatusEvent
 *  @author: Minhhieuano
 *  @created 2/11/2025 11:26 PM
 * */


package com.lemoo.socket.event.event.model;

import com.lemoo.socket.common.enums.MessageStatus;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateMessageStatusEvent extends Event {
    private String messageId;
    private MessageStatus status;
    private String updateBy;
    private String roomId;
}
