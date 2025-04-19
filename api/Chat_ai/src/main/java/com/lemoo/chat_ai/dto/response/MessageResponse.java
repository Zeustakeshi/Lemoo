/*
 *  MessageResponse
 *  @author: pc
 *  @created 4/19/2025 11:56 PM
 * */


package com.lemoo.chat_ai.dto.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.ai.chat.messages.MessageType;

@Data
@Builder
public class MessageResponse {
    private MessageType type;
    private String content;
}
