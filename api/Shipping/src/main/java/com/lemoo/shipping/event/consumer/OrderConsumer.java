/*
 *  OrderConsumer
 *  @author: pc
 *  @created 4/9/2025 12:00 AM
 * */


package com.lemoo.shipping.event.consumer;

import com.lemoo.shipping.event.model.CreateShippingOrderResultEvent;
import com.lemoo.shipping.event.model.NewShippingOrderEvent;
import com.lemoo.shipping.event.producer.OrderProducer;
import com.lemoo.shipping.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderConsumer {

    private final ShippingService shippingService;
    private final OrderProducer orderProducer;

    @KafkaListener(topics = "order-service.shipping.create", groupId = "${spring.kafka.consumer.group-id}")
    public void createShippingOrder(NewShippingOrderEvent event) {
        try {
            shippingService.createShippingOrder(event.getOrderId(), event.getStoreId(), event.getUserId(), event.getShippingAddressId(), event.getSkus());
            orderProducer.createShippingOrderSuccess(CreateShippingOrderResultEvent.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .message("Create shipping order success.")
                    .build());
        } catch (Exception ex) {
            orderProducer.createShippingOrderFailed(CreateShippingOrderResultEvent.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .message(ex.getMessage())
                    .build());
        }
    }
}
