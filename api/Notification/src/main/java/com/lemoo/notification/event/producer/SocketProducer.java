/*
 *  SockerProducer
 *  @author: Minhhieuano
 *  @created 3/13/2025 11:03 AM
 * */


package com.lemoo.notification.event.producer;

import com.lemoo.notification.event.model.RealtimeNotificationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SocketProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendRealtimeNotification(RealtimeNotificationEvent event) {
        kafkaTemplate.send("notification-service.realtime.send", event);
    }
}
