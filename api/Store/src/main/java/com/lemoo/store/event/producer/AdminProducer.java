/*
 *  AdminProducer
 *  @author: Minhhieuano
 *  @created 1/28/2025 3:52 PM
 * */


package com.lemoo.store.event.producer;

import com.lemoo.store.event.eventModel.NewStoreEvent;
import com.lemoo.store.event.eventModel.StoreActivatedEvent;
import com.lemoo.store.event.eventModel.StoreDeactivatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminProducer {
    private final KafkaTemplate<String, Object> adminTemplate;

    public void approveNewStore(NewStoreEvent event) {
        adminTemplate.send("store-service.store.new", event);
    }

    public void storeActivated(StoreActivatedEvent event) {
        adminTemplate.send("store-service.store.activated", event);
    }

    public void storeDeactivated(StoreDeactivatedEvent event) {
        adminTemplate.send("store-service.store.deactivated", event);
    }

}
