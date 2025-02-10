/*
 *  ChatController
 *  @author: Minhhieuano
 *  @created 2/9/2025 12:25 AM
 * */


package com.lemoo.socket.chat;

import com.lemoo.socket.dto.common.AuthenticatedAccount;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat.send-message")
    @SendTo("/topic/receive-message")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        Authentication authentication = (Authentication) headerAccessor.getUser();
        if (authentication != null) {
            AuthenticatedAccount account = (AuthenticatedAccount) authentication.getPrincipal();
            chatMessage.setSender(account.getEmail());
            System.out.println("User từ headerAccessor: " + account.getEmail());
        } else {
            System.out.println("Không có thông tin Authentication trong headerAccessor.");
        }
        return chatMessage;
    }
}
