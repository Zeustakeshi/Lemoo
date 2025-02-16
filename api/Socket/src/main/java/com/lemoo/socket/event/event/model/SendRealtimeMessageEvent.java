/*
 *  sendMessageEvent
 *  @author: Minhhieuano
 *  @created 2/12/2025 12:18 AM
 * */


package com.lemoo.socket.event.event.model;

import com.lemoo.socket.dto.common.UserResponse;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SendRealtimeMessageEvent extends Event {
    private String roomId;
    private UserResponse sender;
    private String message;
    private String messageId;
}
