/*
 *  NotificationProducer
 *  @author: pc
 *  @created 4/8/2025 8:23 PM
 * */


package com.lemoo.order_v2.event.producer;

import com.lemoo.order_v2.event.model.NotifyOrderStatusEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void notifyOrderStatus(NotifyOrderStatusEvent event) {
        kafkaTemplate.send("order-service.order.status.notify", event);
    }
}
