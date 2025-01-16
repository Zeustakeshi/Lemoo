/*
 *  PromotionProducer
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:17 AM
 * */


package com.lemoo.order.event.producer;

import com.lemoo.order.event.eventModel.CartItemRemoveFailedEvent;
import com.lemoo.order.event.eventModel.CartItemRemovedEvent;
import com.lemoo.order.event.eventModel.RemoveCartItemEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartProducer {
    private final KafkaTemplate<String, Object> cartProducer;

    public void removeCartItem(RemoveCartItemEvent event) {
        cartProducer.send("order-service.cart.remove-cart-item", event);
    }

    public void cartItemRemoved(CartItemRemovedEvent event) {
        cartProducer.send("order-service.cart.removed", event);
    }

    public void cartItemRemoveFailed(CartItemRemoveFailedEvent event) {
        cartProducer.send("order-service.cart.remove-failed", event);
    }

}
