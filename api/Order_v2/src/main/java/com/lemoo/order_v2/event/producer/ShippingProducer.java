/*
 *  ShippingProducer
 *  @author: pc
 *  @created 4/8/2025 1:50 AM
 * */


package com.lemoo.order_v2.event.producer;


import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ShippingProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void createShippingOrder() {
    }
}
