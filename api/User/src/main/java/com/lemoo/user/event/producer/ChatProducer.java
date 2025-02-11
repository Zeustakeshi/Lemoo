/*
 *  ChatProducer
 *  @author: Minhhieuano
 *  @created 2/11/2025 3:33 PM
 * */


package com.lemoo.user.event.producer;

import com.lemoo.user.event.eventModel.FriendCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatProducer {
    private final KafkaTemplate<String, Object> chatTemplate;

    public void createChatRoom(FriendCreatedEvent event) {
        chatTemplate.send("user-service.friend.created", event);
    }

}
