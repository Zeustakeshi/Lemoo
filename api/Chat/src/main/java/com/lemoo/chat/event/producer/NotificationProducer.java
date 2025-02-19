/*
 *  NotificationProducer
 *  @author: Minhhieuano
 *  @created 2/11/2025 11:23 PM
 * */


package com.lemoo.chat.event.producer;

import com.lemoo.chat.event.event.model.NotifyNewMessageEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void notifyNewMessage(NotifyNewMessageEvent event) {
        kafkaTemplate.send("chat-service.message.new.notify", event);
    }
}
