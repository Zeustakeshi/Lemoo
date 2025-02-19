/*
 *  UserConsumber
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:53 AM
 * */

package com.lemoo.user.event.consumer;

import com.lemoo.user.event.eventModel.FriendRequestEvent;
import com.lemoo.user.event.eventModel.NewUserEvent;
import com.lemoo.user.event.eventModel.ReceivedFriendRequestEvent;
import com.lemoo.user.service.FriendInvitationService;
import com.lemoo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConsumer {

    private final UserService userService;

    private final FriendInvitationService friendInvitationService;

    @KafkaListener(topics = "auth-service.user.new", groupId = "${spring.kafka.consumer.group-id}")
    public void newUserEventListener(NewUserEvent event) {
        userService.createUser(event.getAccountId(), event.getUserId(), event.getDisplayName());
    }

    @KafkaListener(topics = "user-service.friend.request", groupId = "${spring.kafka.consumer.group-id}")
    public void friendRequestEventListener(FriendRequestEvent event){
        friendInvitationService.receivedFriendRequest(event.getSenderId(),event.getReceiverId());
    }

    @KafkaListener(topics = "user-service.friend.received", groupId = "${spring.kafka.consumer.group-id}")
    public void friendRequestEventListener(ReceivedFriendRequestEvent event){
        friendInvitationService.notifyFriendRequest(event.getSenderId(),event.getReceiverId());
    }

    @KafkaListener(topics = "user-service.friend.accepted", groupId = "${spring.kafka.consumer.group-id}")
    public void acceptFriendEventListener(FriendRequestEvent event){
        friendInvitationService.acceptedFriend(event.getSenderId(),event.getReceiverId());
    }



}
