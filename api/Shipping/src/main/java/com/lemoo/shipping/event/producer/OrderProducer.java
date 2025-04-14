/*
 *  OrderProducer
 *  @author: pc
 *  @created 4/14/2025 11:29 AM
 * */


package com.lemoo.shipping.event.producer;

import com.lemoo.shipping.event.model.CreateShippingOrderResultEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void createShippingOrderFailed(CreateShippingOrderResultEvent event) {
        kafkaTemplate.send("shipping-service.shipping.create.failed", event);
    }

    public void createShippingOrderSuccess(CreateShippingOrderResultEvent event) {
        kafkaTemplate.send("shipping-service.shipping.create.success", event);
    }
}
