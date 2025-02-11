/*
 *  UserConsumer
 *  @author: Minhhieuano
 *  @created 2/11/2025 3:18 PM
 * */


package com.lemoo.chat.event.consumer;

import com.lemoo.chat.event.eventModel.FriendCreatedEvent;
import com.lemoo.chat.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FriendConsumer {

    private final RoomService roomService;

    @KafkaListener(topics = "user-service.friend.created", groupId = "${spring.kafka.consumer.group-id}")
    public void friendCreatedListener(FriendCreatedEvent event) {
        roomService.createSingleRoom(event.getUser1Id(), event.getUser2Id());
    }

}
