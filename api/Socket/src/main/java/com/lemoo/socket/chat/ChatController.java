/*
 *  ChatController
 *  @author: Minhhieuano
 *  @created 2/9/2025 12:25 AM
 * */


package com.lemoo.socket.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat.send-message")
    @SendTo("/topic/receive-message")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage
    ) {
        System.out.println(chatMessage.getContent());
        return chatMessage;
    }
}
