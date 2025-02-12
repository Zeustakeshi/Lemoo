/*
 *  UpdateMessageStatusEvent
 *  @author: Minhhieuano
 *  @created 2/11/2025 11:26 PM
 * */


package com.lemoo.chat.event.event.model;

import com.lemoo.chat.common.enums.MessageStatus;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateMessageStatusEvent extends Event {
    private String messageId;
    private MessageStatus status;
    private String senderId;
    private String roomId;
}
