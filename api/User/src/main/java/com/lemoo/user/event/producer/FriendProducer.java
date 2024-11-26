package com.lemoo.user.event.producer;

import com.lemoo.user.event.eventModel.AcceptFriendRequestEvent;
import com.lemoo.user.event.eventModel.NewFriendRequestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FriendProducer {

	private final KafkaTemplate<String, Object> friendTemplate;

	public void acceptFriendRequest(AcceptFriendRequestEvent event) {
		friendTemplate.send("accept_friend_request", event);
	}

	public void newFriendRequest(NewFriendRequestEvent event) {
		friendTemplate.send("new_friend_request", event);
	}
}
