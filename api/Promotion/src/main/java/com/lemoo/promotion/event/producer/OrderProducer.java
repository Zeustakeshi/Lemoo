/*
 *  OrderProducer
 *  @author: Minhhieuano
 *  @created 1/18/2025 3:55 PM
 * */


package com.lemoo.promotion.event.producer;

import com.lemoo.promotion.event.eventModel.PromotionCheckFailedEvent;
import com.lemoo.promotion.event.eventModel.PromotionCheckedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderProducer {
    private final KafkaTemplate<String, Object> orderTemplate;

    public void promotionChecked(PromotionCheckedEvent event) {
        orderTemplate.send("promotion-service.promotion.checked", event);
    }

    public void promotionCheckFailed(PromotionCheckFailedEvent event) {
        orderTemplate.send("promotion-service.promotion.check-failed", event);
    }

}
