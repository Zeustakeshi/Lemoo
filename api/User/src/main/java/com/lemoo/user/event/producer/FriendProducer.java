/*
 *  FriendProducer
 *  @author: Minhhieuano
 *  @created 2/11/2025 4:19 PM
 * */


package com.lemoo.user.event.producer;

import com.lemoo.user.event.eventModel.AcceptFriendEvent;
import com.lemoo.user.event.eventModel.FriendRequestEvent;
import com.lemoo.user.event.eventModel.ReceivedFriendRequestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FriendProducer {
    private final KafkaTemplate<String, Object> friendTemplate;

    public void acceptFriend(AcceptFriendEvent event) {
        friendTemplate.send("user-service.friend.accepted", event);
    }

    public void receivedFriend(ReceivedFriendRequestEvent event) {
        friendTemplate.send("user-service.friend.received", event);
    }

    public void friendRequest(FriendRequestEvent event) {
        friendTemplate.send("user-service.friend.request", event);
    }

}
