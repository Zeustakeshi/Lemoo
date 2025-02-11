/*
 *  NotificationProducer
 *  @author: Minhhieuano
 *  @created 2/11/2025 4:23 PM
 * */


package com.lemoo.user.event.producer;

import com.lemoo.user.event.eventModel.NotifyAcceptFriendEvent;
import com.lemoo.user.event.eventModel.NotifyFriendRequestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationProducer {
    private final KafkaTemplate<String, Object> notificationTemplate;

    public void notifyFriendRequest(NotifyFriendRequestEvent event) {
        notificationTemplate.send("user-service.friend.request.notify", event);
    }

    public void notifyAcceptedFriend(NotifyAcceptFriendEvent event) {
        notificationTemplate.send("user-service.accepted.friend.notify", event);
    }
}
