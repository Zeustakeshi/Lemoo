/*
 *  SocketServiceImpl
 *  @author: Minhhieuano
 *  @created 2/12/2025 1:12 AM
 * */


package com.lemoo.chat.service.impl;

import com.lemoo.chat.common.enums.MessageStatus;
import com.lemoo.chat.entity.Message;
import com.lemoo.chat.event.event.model.SendRealtimeMessageEvent;
import com.lemoo.chat.event.event.model.UpdateMessageStatusEvent;
import com.lemoo.chat.event.producer.SocketProducer;
import com.lemoo.chat.service.SocketService;
import com.lemoo.chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SocketServiceImpl implements SocketService {

    private final UserService userService;
    private final SocketProducer socketProducer;

    @Async
    @Override
    public void sendRealtimeMessage(Message message) {
        userService.getUserInfo(message.getSenderId()).ifPresent(sender -> socketProducer
                .sendRealtimeMessage(SendRealtimeMessageEvent.builder()
                        .message(message.getText())
                        .roomId(message.getRoomId())
                        .messageId(message.getId())
                        .sender(sender)
                        .build())
        );
    }

    @Async
    @Override
    public void updateMessageStatus(String messageId, String senderId, String roomId, MessageStatus status) {
        socketProducer.updateMessageStatus(UpdateMessageStatusEvent.builder()
                .messageId(messageId)
                .senderId(senderId)
                .status(status)
                .roomId(roomId)
                .build());
    }
}
