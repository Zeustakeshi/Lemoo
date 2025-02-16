/*
 *  NotifyNewMessageEvent
 *  @author: Minhhieuano
 *  @created 2/11/2025 11:19 PM
 * */


package com.lemoo.chat.event.event.model;

import lombok.*;
import org.springframework.stereotype.Component;

@EqualsAndHashCode(callSuper = true)
@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class NotifyNewMessageEvent extends Event {
    private String roomId;
    private String senderId;
    private String message;
}
