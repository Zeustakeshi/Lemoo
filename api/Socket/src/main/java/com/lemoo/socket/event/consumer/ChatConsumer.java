/*
 *  ChatConsumer
 *  @author: Minhhieuano
 *  @created 2/12/2025 12:39 AM
 * */


package com.lemoo.socket.event.consumer;

import com.lemoo.socket.event.event.model.SendRealtimeMessageEvent;
import com.lemoo.socket.event.event.model.UpdateMessageStatusEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "chat-service.message.status.update", groupId = "${spring.kafka.consumer.group-id}")
    public void updateMessageStatusEventListener(UpdateMessageStatusEvent event) {
        messagingTemplate.convertAndSend("/topic/chats/" + event.getRoomId() + "/messages/status", event);
    }

    @KafkaListener(topics = "chat-service.message.realtime.send", groupId = "${spring.kafka.consumer.group-id}")
    public void sendRealtimeMessageEventListener(SendRealtimeMessageEvent event) {
        messagingTemplate.convertAndSend("/topic/chats/" + event.getRoomId() + "/messages", event);
    }
}
