/*
 *  StoreConsumer
 *  @author: Minhhieuano
 *  @created 1/28/2025 4:02 PM
 * */


package com.lemoo.admin.event.consumer;

import com.lemoo.admin.common.enums.StoreStatus;
import com.lemoo.admin.entity.Store;
import com.lemoo.admin.event.eventModel.NewStoreEvent;
import com.lemoo.admin.event.eventModel.NotifyStoreStatusEvent;
import com.lemoo.admin.event.eventModel.StoreActivatedEvent;
import com.lemoo.admin.event.producer.NotificationProducer;
import com.lemoo.admin.mapper.StoreMapper;
import com.lemoo.admin.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StoreConsumer {

    private final StoreService storeService;
    private final StoreMapper storeMapper;
    private final NotificationProducer notificationProducer;

    @KafkaListener(groupId = "${spring.kafka.consumer.group-id}", topics = "store-service.store.new")
    public void newStoreEventListener(NewStoreEvent event) {
        Store store = storeMapper.toStore(event);
        store.setStatus(StoreStatus.PENDING);
        storeService.saveStore(store);
    }

    @KafkaListener(topics = "store-service.store.activated", groupId = "${spring.kafka.consumer.group-id}")
    public void storeActivatedEventListener(StoreActivatedEvent event) {
        Store store = storeService.findByStoreId(event.getStoreId());
        notificationProducer.notifyStoreStatus(NotifyStoreStatusEvent.builder()
                .email(store.getStoreEmail())
                .status(StoreStatus.ACTIVE)
                .build());
    }
}
