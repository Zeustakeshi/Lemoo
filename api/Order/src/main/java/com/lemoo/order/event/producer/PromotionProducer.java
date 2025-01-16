/*
 *  PromotionProducer
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:17 AM
 * */


package com.lemoo.order.event.producer;

import com.lemoo.order.event.eventModel.OrderCreatedEvent;
import com.lemoo.order.event.eventModel.RevertPromotionEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PromotionProducer {
    private final KafkaTemplate<String, Object> promotionReducer;

    public void checkPromotion(OrderCreatedEvent event) {
        promotionReducer.send("order-service.order.created", event);
    }

    public void revertPromotion(RevertPromotionEvent event) {
        promotionReducer.send("promotion-service.promotion.revert-requested", event);
    }
}
