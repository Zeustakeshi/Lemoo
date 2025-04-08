/*
 *  ProductProducer
 *  @author: pc
 *  @created 4/8/2025 2:05 PM
 * */


package com.lemoo.order_v2.event.producer;

import com.lemoo.order_v2.event.model.ReserveProductEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void reserveProduct(ReserveProductEvent event) {
        kafkaTemplate.send("order-service.product.reserve", event);
    }
}
