/*
 *  OrderProducer
 *  @author: Minhhieuano
 *  @created 1/18/2025 11:01 PM
 * */


package com.lemoo.product.event.producer;

import com.lemoo.product.event.eventModel.ProductReserveFailedEvent;
import com.lemoo.product.event.eventModel.ProductReservedEvent;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderProducer {
    private static final Logger log = LoggerFactory.getLogger(OrderProducer.class);
    private final KafkaTemplate<String, Object> orderProducer;

    public void reservedProduct(ProductReservedEvent event) {
        orderProducer.send("product-service.product.reserved", event);
    }

    public void reserveProductFailed(ProductReserveFailedEvent event) {
        orderProducer.send("product-service.product.reserve-failed", event);
    }

}
