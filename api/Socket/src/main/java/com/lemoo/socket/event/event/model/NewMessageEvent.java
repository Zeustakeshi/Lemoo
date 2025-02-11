/*
 *  NewMessageEvent
 *  @author: Minhhieuano
 *  @created 2/11/2025 5:49 PM
 * */


package com.lemoo.socket.event.event.model;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewMessageEvent extends Event {
    private String senderId;
    private String roomId;
    private String message;
}
