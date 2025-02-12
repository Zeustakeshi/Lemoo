/*
 *  SocketProducer
 *  @author: Minhhieuano
 *  @created 2/11/2025 11:27 PM
 * */


package com.lemoo.chat.event.producer;

import com.lemoo.chat.event.event.model.SendRealtimeMessageEvent;
import com.lemoo.chat.event.event.model.UpdateMessageStatusEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SocketProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void updateMessageStatus(UpdateMessageStatusEvent event) {
        kafkaTemplate.send("chat-service.message.status.update", event);
    }

    public void sendRealtimeMessage(SendRealtimeMessageEvent event) {
        kafkaTemplate.send("chat-service.message.realtime.send", event);
    }

}
