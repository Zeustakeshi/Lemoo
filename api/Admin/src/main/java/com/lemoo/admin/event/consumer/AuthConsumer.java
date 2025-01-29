/*
 *  AuthConsumer
 *  @author: Minhhieuano
 *  @created 1/29/2025 4:01 PM
 * */


package com.lemoo.admin.event.consumer;

import com.lemoo.admin.entity.Store;
import com.lemoo.admin.event.eventModel.ActivateStoreEvent;
import com.lemoo.admin.event.eventModel.SellerRoleCreatedEvent;
import com.lemoo.admin.event.producer.StoreProducer;
import com.lemoo.admin.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthConsumer {
    private final StoreProducer storeProducer;
    private final StoreService storeService;

    @KafkaListener(topics = "auth-service.account.role.seller.created", groupId = "${spring.kafka.consumer.group-id}")
    public void sellerRoleCreatedEventListener(SellerRoleCreatedEvent event) {
        Store store = storeService.findByAccountId(event.getAccountId());
        storeProducer.activateStore(ActivateStoreEvent.builder()
                .storeId(store.getStoreId())
                .build());
    }
}
