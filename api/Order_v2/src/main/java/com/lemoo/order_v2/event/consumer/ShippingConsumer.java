/*
 *  ShippingConsumer
 *  @author: pc
 *  @created 4/8/2025 2:06 PM
 * */


package com.lemoo.order_v2.event.consumer;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.event.model.CreateShippingOrderResultEvent;
import com.lemoo.order_v2.event.model.UpdateOrderShippingStatusEvent;
import com.lemoo.order_v2.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ShippingConsumer {

    private final OrderService orderService;

    @KafkaListener(topics = "shipping-service.shipping.create.success", groupId = "${spring.kafka.consumer.group-id}")
    public void createShippingOrderSuccess(CreateShippingOrderResultEvent event) {
        orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.SHIPPED);
    }

    @KafkaListener(topics = "shipping-service.shipping.create.failed", groupId = "${spring.kafka.consumer.group-id}")
    public void createShippingOrderFailed(CreateShippingOrderResultEvent event) {
        orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.FAILED_DELIVERY);
    }

    @KafkaListener(topics = "shipping-service.shipping.status.update", groupId = "${spring.kafka.consumer.group-id}")
    public void updateOrderShippingStatus(UpdateOrderShippingStatusEvent event) {
        if (event.getShippingStatus().equals(UpdateOrderShippingStatusEvent.ShippingStatus.IN_TRANSIT)) {
            orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.IN_TRANSIT);
        } else if (event.getShippingStatus().equals(UpdateOrderShippingStatusEvent.ShippingStatus.DELIVERED)) {
            orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.DELIVERED);
            // TODO: notify to user review product
        } else {
            orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.FAILED_DELIVERY);
        }
    }
}
