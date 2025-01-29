/*
 *  NotificationProducer
 *  @author: Minhhieuano
 *  @created 1/29/2025 4:26 PM
 * */


package com.lemoo.admin.event.producer;

import com.lemoo.admin.event.eventModel.NotifyStoreStatusEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationProducer {
    private final KafkaTemplate<String, Object> notificationTemplate;

    public void notifyStoreStatus(NotifyStoreStatusEvent event) {
        notificationTemplate.send("admin-service.store.status.notify", event);
    }


}
