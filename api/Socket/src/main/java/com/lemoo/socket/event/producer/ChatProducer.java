/*
 *  ChatProducer
 *  @author: Minhhieuano
 *  @created 2/11/2025 5:52 PM
 * */


package com.lemoo.socket.event.producer;

import com.lemoo.socket.event.event.model.NewMessageEvent;
import com.lemoo.socket.event.event.model.UpdateMessageStatusEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatProducer {
    private final KafkaTemplate<String, Object> chatTemplate;

    public void sendMessage(NewMessageEvent event) {
        chatTemplate.send("socket-service.chat.message.new", event);
    }

    public void updateMessageStatus(UpdateMessageStatusEvent event) {
        chatTemplate.send("socket-service.chat.message.status.update", event);
    }
}
