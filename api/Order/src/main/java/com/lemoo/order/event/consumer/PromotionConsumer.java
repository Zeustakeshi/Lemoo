/*
 *  UserConsumber
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:53 AM
 * */

package com.lemoo.order.event.consumer;

import com.lemoo.order.common.enums.OrderProcessStatus;
import com.lemoo.order.common.enums.OrderStatus;
import com.lemoo.order.event.eventModel.*;
import com.lemoo.order.event.producer.ProductProducer;
import com.lemoo.order.service.BuyerOrderItemService;
import com.lemoo.order.service.BuyerOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PromotionConsumer {

    private final BuyerOrderService orderService;
    private final ProductProducer productProducer;
    private final BuyerOrderItemService orderItemService;

    @Transactional
    @KafkaListener(topics = "promotion-service.promotion.checked", groupId = "${spring.kafka.consumer.group-id}")
    public void promotionCheckedListener(PromotionCheckedEvent event) {
        orderService.updateOrderProcessStatus(event.getOrderId(), OrderProcessStatus.PENDING_PRODUCT_RESERVATION);
        var orderItems = orderItemService
                .findAllByOrderId(event.getOrderId()).stream().map(sku -> OrderSkuPayload.builder()
                        .productId(sku.getProductId())
                        .quantity(sku.getQuantity())
                        .skuCode(sku.getSkuCode())
                        .build()).collect(Collectors.toSet());

        productProducer.reserveProduct(ReserveProductEvent.builder()
                .skus(orderItems)
                .orderId(event.getOrderId())
                .build());
    }

    @KafkaListener(topics = "promotion-service.promotion.check-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void promotionCheckFailedListener(PromotionCheckFailedEvent event) {
        orderService.updateOrderProcessStatusAndStatus(event.getOrderId(), OrderProcessStatus.FAILED_PROMOTION, OrderStatus.PROCESSING_FAILED);
    }

    @KafkaListener(topics = "promotion-service.promotion.reverted", groupId = "${spring.kafka.consumer.group-id}")
    public void promotionRevertedListener(PromotionRevertedEvent event) {
        orderService.updateOrderProcessStatusAndStatus(event.getOrderId(), OrderProcessStatus.COMPLETED, OrderStatus.PROCESSING_FAILED);
    }

    @KafkaListener(topics = "promotion-service.promotion.revert-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void promotionRevertFailedListener(PromotionRevertFailedEvent event) {
        // TODO: handle revert promotion fail
    }


}
