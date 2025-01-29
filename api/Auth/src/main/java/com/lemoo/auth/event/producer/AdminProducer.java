/*
 *  AdminProducer
 *  @author: Minhhieuano
 *  @created 1/29/2025 3:55 PM
 * */


package com.lemoo.auth.event.producer;

import com.lemoo.auth.event.eventModel.SellerRoleCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sellerRoleCreated(SellerRoleCreatedEvent event) {
        kafkaTemplate.send("auth-service.account.role.seller.created", event);
    }
}
