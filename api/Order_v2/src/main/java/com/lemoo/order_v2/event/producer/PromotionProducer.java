/*
 *  PromotionProducer
 *  @author: pc
 *  @created 4/8/2025 2:05 PM
 * */


package com.lemoo.order_v2.event.producer;

import com.lemoo.order_v2.event.model.ApplyVoucherEvent;
import com.lemoo.order_v2.event.model.CompensateVoucherEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PromotionProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void applyVoucher(ApplyVoucherEvent event) {
        kafkaTemplate.send("order-service.voucher.apply", event);
    }

    public void compensateVoucher(CompensateVoucherEvent event) {
        kafkaTemplate.send("order-service.voucher.compensate", event);
    }
}
