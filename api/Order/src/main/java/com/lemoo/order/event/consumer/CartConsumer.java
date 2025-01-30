/*
 *  CartConsumer
 *  @author: Minhhieuano
 *  @created 1/16/2025 11:05 AM
 * */


package com.lemoo.order.event.consumer;

import com.lemoo.order.event.eventModel.CartItemRemoveFailedEvent;
import com.lemoo.order.event.eventModel.CartItemRemovedEvent;
import com.lemoo.order.event.eventModel.InitCartEvent;
import com.lemoo.order.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartConsumer {

    private final CartService cartService;

    @KafkaListener(topics = "order-service.cart.initial", groupId = "order_group")
    public void cartInitialListener(InitCartEvent event) {
        cartService.initCart(event.getUserId());
    }

    @KafkaListener(topics = "order-service.cart.removed", groupId = "${spring.kafka.consumer.group-id}")
    public void productReserveListener(CartItemRemovedEvent event) {

    }

    @KafkaListener(topics = "order-service.cart.remove-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void productReserveListener(CartItemRemoveFailedEvent event) {

    }
}
