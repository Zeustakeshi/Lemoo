/*
 *  OrderConsumer
 *  @author: Minhhieuano
 *  @created 1/18/2025 3:32 PM
 * */


package com.lemoo.promotion.event.consumer;

import com.lemoo.promotion.event.eventModel.OrderCreatedEvent;
import com.lemoo.promotion.event.eventModel.PromotionRevertedEvent;
import com.lemoo.promotion.event.eventModel.RevertPromotionEvent;
import com.lemoo.promotion.event.producer.OrderProducer;
import com.lemoo.promotion.service.UserVoucherService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderConsumer {

    private static final Logger log = LoggerFactory.getLogger(OrderConsumer.class);
    private final UserVoucherService userVoucherService;
    private final OrderProducer orderProducer;

    @KafkaListener(topics = "order-service.order.created", groupId = "${spring.kafka.consumer.group-id}")
    public void createOrderListener(OrderCreatedEvent event) {
        log.info("new order created");
        userVoucherService.checkOrderVoucher(event.getOrderId(), event.getUserId(), event.getPromotions());
    }

    @KafkaListener(topics = "promotion-service.promotion.revert-requested", groupId = "${spring.kafka.consumer.group-id}")
    public void revertPromotionListener(RevertPromotionEvent event) {
        log.info("Start revert promotion");
        orderProducer.promotionReverted(PromotionRevertedEvent.builder()
                .orderId(event.getOrderId())
                .build());

    }


}
