package com.lemoo.user.event.producer;

import com.lemoo.user.event.eventModel.AcceptFriendRequestEvent;
import com.lemoo.user.event.eventModel.NewUserEvent;
import com.lemoo.user.event.eventModel.RejectFriendInvitationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FriendInvitationProducer {

    private final KafkaTemplate<String, Object> friendTemplate;


    public void acceptFriendRequest(AcceptFriendRequestEvent event){
        friendTemplate.send("accept_friend_request", event);
    }

    public void rejectFriendRequest(RejectFriendInvitationEvent event) {
        friendTemplate.send("reject_friend_request", event);
    }


}
