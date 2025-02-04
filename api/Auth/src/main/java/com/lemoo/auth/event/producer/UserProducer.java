/*
 *  UserProducer
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:51 AM
 * */

package com.lemoo.auth.event.producer;

import com.lemoo.auth.event.eventModel.NewUserEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserProducer {
    private final KafkaTemplate<String, Object> userTemplate;

    public void createUserProfile(NewUserEvent event) {
        userTemplate.send("auth-service.user.new", event);
    }
}
