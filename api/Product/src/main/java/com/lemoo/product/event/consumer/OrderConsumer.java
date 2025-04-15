/*
 *  OrderConsumer
 *  @author: Minhhieuano
 *  @created 1/18/2025 11:31 PM
 * */


package com.lemoo.product.event.consumer;

import com.lemoo.product.event.eventModel.ProductReserveResultEvent;
import com.lemoo.product.event.eventModel.ReserveProductEvent;
import com.lemoo.product.event.producer.OrderProducer;
import com.lemoo.product.service.ProductOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderConsumer {
    private final ProductOrderService productOrderService;
    private final OrderProducer orderProducer;

    @KafkaListener(topics = "order-service.product.reserve", groupId = "${spring.kafka.consumer.group-id}")
    public void reserveProductListener(ReserveProductEvent event) {

        ProductReserveResultEvent reserveResultEvent = ProductReserveResultEvent.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .build();

        try {
            productOrderService.reserveProduct(event.getSkus());
            reserveResultEvent.setMessage("Reserve product success");
            orderProducer.reservedProduct(reserveResultEvent);
        } catch (Exception exception) {
            reserveResultEvent.setMessage(exception.getMessage());
            orderProducer.reserveProductFailed(reserveResultEvent);
        }
    }
}
