/*
 *  OrderProducer
 *  @author: Minhhieuano
 *  @created 1/18/2025 3:55 PM
 * */


package com.lemoo.promotion.event.producer;

import com.lemoo.promotion.event.eventModel.ApplyVoucherResultEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void applyVoucherFailed(ApplyVoucherResultEvent event) {
        kafkaTemplate.send("promotion-service.voucher.apply.failed", event);
    }

    public void applyVoucherSuccess(ApplyVoucherResultEvent event) {
        kafkaTemplate.send("promotion-service.voucher.apply.success", event);
    }
}
