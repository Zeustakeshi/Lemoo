/*
 *  UserConsumber
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:53 AM
 * */

package com.lemoo.order.event.consumer;

import com.lemoo.order.common.enums.OrderProcessStatus;
import com.lemoo.order.entity.Order;
import com.lemoo.order.event.eventModel.ProductReserveFailedEvent;
import com.lemoo.order.event.eventModel.ProductReservedEvent;
import com.lemoo.order.event.eventModel.RevertPromotionEvent;
import com.lemoo.order.event.producer.PromotionProducer;
import com.lemoo.order.service.BuyerOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ProductConsumer {

    private final BuyerOrderService orderService;
    private final PromotionProducer promotionProducer;

    @KafkaListener(topics = "product-service.product.reserved", groupId = "${spring.kafka.consumer.group-id}")
    public void productReserveListener(ProductReservedEvent event) {
        orderService.updateOrderProcessStatus(event.getOrderId(), OrderProcessStatus.COMPLETED);
    }

    @Transactional
    @KafkaListener(topics = "product-service.product.reserve-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void productReserveFailedListener(ProductReserveFailedEvent event) {
        Order order = orderService.updateOrderProcessStatus(event.getOrderId(), OrderProcessStatus.REVERSING_PROMOTION);
        promotionProducer.revertPromotion(RevertPromotionEvent.builder()
                .orderId(event.getOrderId())
                .promotions(order.getPromotions())
                .build());
    }
}
