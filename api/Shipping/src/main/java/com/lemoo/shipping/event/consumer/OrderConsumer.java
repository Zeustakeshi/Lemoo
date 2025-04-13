/*
 *  OrderConsumer
 *  @author: pc
 *  @created 4/9/2025 12:00 AM
 * */


package com.lemoo.shipping.event.consumer;

import com.lemoo.shipping.event.model.NewShippingOrderEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderConsumer {

    @KafkaListener(topics = "shipping-service.shipping.create.failed", groupId = "${spring.kafka.consumer.group-id}")
    public void createShippingOrder(NewShippingOrderEvent event) {
        
    }
}
