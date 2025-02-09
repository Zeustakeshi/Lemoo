/*
 *  ChatMessage
 *  @author: Minhhieuano
 *  @created 2/9/2025 12:26 AM
 * */


package com.lemoo.socket.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String content;
    private String sender;
}
