/*
 *  OrderProducer
 *  @author: Minhhieuano
 *  @created 1/18/2025 3:55 PM
 * */


package com.lemoo.promotion.event.producer;

import com.lemoo.promotion.event.eventModel.PromotionCheckFailedEvent;
import com.lemoo.promotion.event.eventModel.PromotionCheckedEvent;
import com.lemoo.promotion.event.eventModel.PromotionRevertFailedEvent;
import com.lemoo.promotion.event.eventModel.PromotionRevertedEvent;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderProducer {
    private static final Logger log = LoggerFactory.getLogger(OrderProducer.class);
    private final KafkaTemplate<String, Object> orderTemplate;

    public void promotionChecked(PromotionCheckedEvent event) {
        log.info("promotion check success send check status to order service");
        orderTemplate.send("promotion-service.promotion.checked", event);
    }

    public void promotionCheckFailed(PromotionCheckFailedEvent event) {
        orderTemplate.send("promotion-service.promotion.check-failed", event);
    }

    public void promotionReverted(PromotionRevertedEvent event) {
        log.info("promotion reverted.");
        orderTemplate.send("promotion-service.promotion.reverted", event);
    }

    public void promotionRevertFailed(PromotionRevertFailedEvent event) {
        log.info("promotion revert failed.");
        orderTemplate.send("promotion-service.promotion.revert-failed", event);
    }
}
