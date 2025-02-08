/*
 *  UserProducer
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:51 AM
 * */

package com.lemoo.user.event.producer;

import com.lemoo.user.event.eventModel.*;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserProducer {
	private final KafkaTemplate<String, Object> userTemplate;

	public void createUserProfile(NewUserEvent event) {
		userTemplate.send("new_user", event);
	}

	public void AcceptFriend(AcceptFriendEvent event) {
		userTemplate.send("user-service.accepted.friend", event);
	}

	public void ReceivedFriend(ReceivedFriendRequestEvent event){
		userTemplate.send("user-service.friend.received",event);
	}

	public void FriendRequest(FriendRequestEvent event) {
		userTemplate.send("user-service.friend.request", event);
	}

	public void NotifyFriendRequest(NotifyFriendRequestEvent event){
		userTemplate.send("user-service.friend.request.notify", event);
	}

	public void NotifyAcceptedFriend(NotifyAcceptFriendEvent event){
		userTemplate.send("user-service.accepted.friend.notify",event);
	}

}
