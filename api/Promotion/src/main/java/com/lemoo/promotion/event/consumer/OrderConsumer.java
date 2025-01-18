/*
 *  OrderConsumer
 *  @author: Minhhieuano
 *  @created 1/18/2025 3:32 PM
 * */


package com.lemoo.promotion.event.consumer;

import com.lemoo.promotion.event.eventModel.OrderCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderConsumer {

    @KafkaListener(topics = "order-service.order.created", groupId = "${spring.kafka.consumer.group-id}")
    public void createOrderListener(OrderCreatedEvent event) {
    }

}
