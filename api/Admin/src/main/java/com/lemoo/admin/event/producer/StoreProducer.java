/*
 *  StoreProducer
 *  @author: Minhhieuano
 *  @created 1/29/2025 4:04 PM
 * */


package com.lemoo.admin.event.producer;

import com.lemoo.admin.event.eventModel.ActivateStoreEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StoreProducer {
    private final KafkaTemplate<String, Object> storeTemplate;

    public void activateStore(ActivateStoreEvent event) {
        storeTemplate.send("admin-service.store.activate", event);
    }
}
