/*
 *  CartConsumer
 *  @author: Minhhieuano
 *  @created 1/16/2025 11:05 AM
 * */


package com.lemoo.order.event.consumer;

import com.lemoo.order.event.eventModel.CartItemRemoveFailedEvent;
import com.lemoo.order.event.eventModel.CartItemRemovedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartConsumer {
    @KafkaListener(topics = "order-service.cart.removed", groupId = "${spring.kafka.consumer.group-id}")
    public void productReserveListener(CartItemRemovedEvent event) {

    }

    @KafkaListener(topics = "order-service.cart.remove-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void productReserveListener(CartItemRemoveFailedEvent event) {

    }
}
