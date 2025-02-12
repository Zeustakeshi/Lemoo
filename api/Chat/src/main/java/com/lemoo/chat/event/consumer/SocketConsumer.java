/*
 *  SocketConsumer
 *  @author: Minhhieuano
 *  @created 2/11/2025 6:46 PM
 * */


package com.lemoo.chat.event.consumer;

import com.lemoo.chat.event.event.model.NewMessageEvent;
import com.lemoo.chat.event.event.model.UpdateMessageStatusEvent;
import com.lemoo.chat.service.MessageService;
import com.lemoo.chat.service.MessageStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SocketConsumer {

    private final MessageService messageService;
    private final MessageStatusService messageStatusService;

    @KafkaListener(topics = "socket-service.chat.message.new", groupId = "${spring.kafka.consumer.group-id}")
    public void newMessageEventListener(NewMessageEvent event) {
        messageService.createMessage(event.getSenderId(), event.getRoomId(), event.getMessage());
    }

    @KafkaListener(topics = "socket-service.chat.message.status.update", groupId = "${spring.kafka.consumer.group-id}")
    public void updateMessageStatusEventListener(UpdateMessageStatusEvent event) {
        messageStatusService.updateMessageStatus(event.getMessageId(), event.getStatus());
    }

}
