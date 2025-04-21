/*
 *  OrderConsumer
 *  @author: Minhhieuano
 *  @created 1/18/2025 3:32 PM
 * */


package com.lemoo.promotion.event.consumer;

import com.lemoo.promotion.event.eventModel.ApplyVoucherEvent;
import com.lemoo.promotion.event.eventModel.ApplyVoucherResultEvent;
import com.lemoo.promotion.event.eventModel.CompensateVoucherEvent;
import com.lemoo.promotion.event.producer.OrderProducer;
import com.lemoo.promotion.service.VoucherCollectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderConsumer {

    private final VoucherCollectionService voucherCollectionService;
    private final OrderProducer orderProducer;

    @KafkaListener(topics = "order-service.voucher.apply", groupId = "${spring.kafka.consumer.group-id}")
    public void applyVoucherEventListener(ApplyVoucherEvent event) {
        ApplyVoucherResultEvent resultEvent = ApplyVoucherResultEvent.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .build();

        try {
            voucherCollectionService.updateUserVoucherQuantity(event.getUserId(), event.getVouchers(), 1);
            orderProducer.applyVoucherSuccess(resultEvent);
        } catch (Exception exception) {
            resultEvent.setMessage(exception.getMessage());
            orderProducer.applyVoucherFailed(resultEvent);
            log.error("Failed to apply voucher for userId: {}, orderId: {}", event.getUserId(), event.getOrderId(), exception);
        }
    }

    @KafkaListener(topics = "order-service.voucher.compensate", groupId = "${spring.kafka.consumer.group-id}")
    public void compensateVoucher(CompensateVoucherEvent event) {
        try {
            voucherCollectionService.compensateVoucher(event.getUserId(), event.getVouchers());
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
    }

}
