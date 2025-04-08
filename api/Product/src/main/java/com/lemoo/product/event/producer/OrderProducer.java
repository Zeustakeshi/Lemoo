/*
 *  OrderProducer
 *  @author: Minhhieuano
 *  @created 1/18/2025 11:01 PM
 * */


package com.lemoo.product.event.producer;

import com.lemoo.product.event.eventModel.ProductReserveResultEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class OrderProducer {
    private final KafkaTemplate<String, Object> orderProducer;

    public void reservedProduct(ProductReserveResultEvent event) {
        orderProducer.send("product-service.product.reserved", event);
    }

    public void reserveProductFailed(ProductReserveResultEvent event) {
        orderProducer.send("product-service.product.reserve-failed", event);
    }

}
