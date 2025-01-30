/*
 *  AuthProducer
 *  @author: Minhhieuano
 *  @created 1/29/2025 3:22 PM
 * */


package com.lemoo.admin.event.producer;

import com.lemoo.admin.event.eventModel.NewSellerEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthProducer {
    private final KafkaTemplate<String, Object> authTemplate;

    public void addSellerRole(NewSellerEvent event) {
        authTemplate.send("admin-service.seller.new", event);
    }

}
