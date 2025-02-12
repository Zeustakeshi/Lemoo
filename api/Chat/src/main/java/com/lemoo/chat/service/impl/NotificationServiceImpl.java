/*
 *  NotificationServiceImpl
 *  @author: Minhhieuano
 *  @created 2/12/2025 1:08 AM
 * */


package com.lemoo.chat.service.impl;

import com.lemoo.chat.event.event.model.NotifyNewMessageEvent;
import com.lemoo.chat.event.producer.NotificationProducer;
import com.lemoo.chat.event.producer.SocketProducer;
import com.lemoo.chat.service.NotificationService;
import com.lemoo.chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationProducer notificationProducer;
    private final UserService userService;
    private final SocketProducer socketProducer;

    @Override
    @Async
    public void sendNewMessageNotification(String message, String roomId, String senderId) {
        notificationProducer.notifyNewMessage(NotifyNewMessageEvent.builder()
                .message(message)
                .roomId(roomId)
                .senderId(senderId)
                .build());
    }


}
