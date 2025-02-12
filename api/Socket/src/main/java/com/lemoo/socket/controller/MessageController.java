/*
 *  MessageController
 *  @author: Minhhieuano
 *  @created 2/11/2025 4:54 PM
 * */


package com.lemoo.socket.controller;


import com.lemoo.socket.common.enums.MessageStatus;
import com.lemoo.socket.dto.chat.ChatMessage;
import com.lemoo.socket.dto.common.AuthenticatedAccount;
import com.lemoo.socket.event.event.model.NewMessageEvent;
import com.lemoo.socket.event.event.model.UpdateMessageStatusEvent;
import com.lemoo.socket.event.producer.ChatProducer;
import com.lemoo.socket.utils.AuthHeaderExtractorService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final ChatProducer chatProducer;

    @MessageMapping("/chats/{roomId}/messages/send-message")
    public void sendMessage(
            @Payload ChatMessage message,
            @DestinationVariable("roomId") String roomId,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        AuthenticatedAccount account = AuthHeaderExtractorService.extractAccountFormHeaderAccessor(headerAccessor);
        chatProducer.sendMessage(NewMessageEvent.builder()
                .message(message.getMessage())
                .roomId(roomId)
                .senderId(account.getUserId())
                .build());
    }

    @MessageMapping("/chats/{roomId}/messages/{messageId}/ack")
    public void ackReceiveMessage(
            @DestinationVariable("roomId") String roomId,
            @DestinationVariable("messageId") String messageId,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        AuthenticatedAccount account = AuthHeaderExtractorService.extractAccountFormHeaderAccessor(headerAccessor);
        chatProducer.updateMessageStatus(UpdateMessageStatusEvent.builder()
                .messageId(messageId)
                .roomId(roomId)
                .senderId(account.getUserId())
                .status(MessageStatus.RECEIVED)
                .build());
    }

}
