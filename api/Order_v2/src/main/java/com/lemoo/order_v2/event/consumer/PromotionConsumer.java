/*
 *  PromotionConsumer
 *  @author: pc
 *  @created 4/8/2025 2:06 PM
 * */


package com.lemoo.order_v2.event.consumer;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.event.model.ApplyVoucherResultEvent;
import com.lemoo.order_v2.event.model.NotifyOrderStatusEvent;
import com.lemoo.order_v2.event.model.ReserveProductEvent;
import com.lemoo.order_v2.event.producer.NotificationProducer;
import com.lemoo.order_v2.event.producer.ProductProducer;
import com.lemoo.order_v2.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class PromotionConsumer {

    private final OrderService orderService;
    private final ProductProducer productProducer;
    private final NotificationProducer notificationProducer;

    @KafkaListener(topics = "promotion-service.voucher.apply.success", groupId = "${spring.kafka.consumer.group-id}")
    public void applyVoucherSuccessEventListener(ApplyVoucherResultEvent event) {
        Order order = orderService.findByIdAndUserId(event.getOrderId(), event.getUserId());
        Map<String, Integer> skus = new HashMap<>();

        order.getItems().forEach(orderItem -> {
            skus.put(orderItem.getSkuCode(), orderItem.getQuantity());
        });

        productProducer.reserveProduct(ReserveProductEvent.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .skus(skus)
                .build());
    }

    @KafkaListener(topics = "promotion-service.voucher.apply.failed", groupId = "${spring.kafka.consumer.group-id}")
    public void applyVoucherFailedEventListener(ApplyVoucherResultEvent event) {
        orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.CANCELLED);
        notificationProducer.notifyOrderStatus(NotifyOrderStatusEvent.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .message(event.getMessage())
                .build());
    }


}
