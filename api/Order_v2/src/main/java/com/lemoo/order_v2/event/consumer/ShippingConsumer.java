/*
 *  ShippingConsumer
 *  @author: pc
 *  @created 4/8/2025 2:06 PM
 * */


package com.lemoo.order_v2.event.consumer;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.event.model.CreateShippingOrderFailedEvent;
import com.lemoo.order_v2.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ShippingConsumer {

    private final OrderService orderService;

    @KafkaListener(topics = "shipping-service.shipping.create.failed", groupId = "${spring.kafka.consumer.group-id}")
    public void createShippingOrderFailed(CreateShippingOrderFailedEvent event) {
        orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.FAILED_DELIVERY);
    }
}
