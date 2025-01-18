/*
 *  OrderConsumer
 *  @author: Minhhieuano
 *  @created 1/18/2025 11:31 PM
 * */


package com.lemoo.product.event.consumer;

import com.lemoo.product.event.eventModel.ReserveProductEvent;
import com.lemoo.product.service.ProductOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderConsumer {
    private final ProductOrderService productOrderService;

    @KafkaListener(topics = "product-service.product.reserve-requested", groupId = "${spring.kafka.consumer.group-id}")
    public void reserveProductListener(ReserveProductEvent event) {
        System.out.println("new product reserve request");
        productOrderService.checkProductOrder(event.getOrderId(), event.getSkus());
    }
}
