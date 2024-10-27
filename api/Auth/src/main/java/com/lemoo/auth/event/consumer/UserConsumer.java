/*
 *  UserConsumber
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:53 AM
 * */

package com.lemoo.auth.event.consumer;

import com.lemoo.auth.event.eventModel.NewUserEvent;
import com.lemoo.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConsumer {

	private final UserService userService;

	@KafkaListener(topics = "new_user", groupId = "${spring.kafka.consumer.group-id}")
	public void newUserEventListener(NewUserEvent event) {
		userService.createUser(event.getAccountId(), event.getUserId(), event.getDisplayName());
	}
}
