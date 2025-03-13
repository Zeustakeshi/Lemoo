/*
 *  NotificationConsumer
 *  @author: Minhhieuano
 *  @created 3/13/2025 11:17 AM
 * */


package com.lemoo.socket.event.consumer;

import com.lemoo.socket.event.event.model.RealtimeNotificationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "notification-service.realtime.send", groupId = "${spring.kafka.consumer.group-id}")
    public void notificationEventListener(RealtimeNotificationEvent event) {
        messagingTemplate.convertAndSend("/topic/notifications/" + event.getTargetId(), event);
    }
}
