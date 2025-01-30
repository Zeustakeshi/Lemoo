/*
 *  AdminConsumer
 *  @author: Minhhieuano
 *  @created 1/29/2025 4:10 PM
 * */


package com.lemoo.store.event.consumer;

import com.lemoo.store.common.enums.StoreStatus;
import com.lemoo.store.event.eventModel.ActivateStoreEvent;
import com.lemoo.store.event.eventModel.DeactivateStoreEvent;
import com.lemoo.store.event.eventModel.StoreActivatedEvent;
import com.lemoo.store.event.eventModel.StoreDeactivatedEvent;
import com.lemoo.store.event.producer.AdminProducer;
import com.lemoo.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminConsumer {

    private final StoreService storeService;
    private final AdminProducer adminProducer;

    @KafkaListener(topics = "admin-service.store.activate", groupId = "${spring.kafka.consumer.group-id}")
    public void ActivateStoreEventListener(ActivateStoreEvent event) {
        String storeId = event.getStoreId();

        storeService.updateStoreStatus(storeId, StoreStatus.ACTIVE);

        adminProducer.storeActivated(StoreActivatedEvent.builder()
                .storeId(storeId)
                .build());
    }

    @KafkaListener(topics = "admin-service.store.deactivate", groupId = "${spring.kafka.consumer.group-id}")
    public void DeactivateStoreEventListener(DeactivateStoreEvent event) {
        String storeId = event.getStoreId();

        storeService.updateStoreStatus(storeId, StoreStatus.NOT_ACTIVE);

        adminProducer.storeDeactivated(StoreDeactivatedEvent.builder()
                .storeId(storeId)
                .build());
    }

}
