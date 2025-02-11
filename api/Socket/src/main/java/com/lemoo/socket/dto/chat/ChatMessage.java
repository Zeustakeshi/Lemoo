/*
 *  ChatMessage
 *  @author: Minhhieuano
 *  @created 2/11/2025 4:57 PM
 * */


package com.lemoo.socket.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private String message;
}
