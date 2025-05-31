/*
 *  promotionConsumer
 *  @author: pc
 *  @created 4/21/2025 1:50 PM
 * */


package com.lemoo.chat.event.consumer;

import com.lemoo.chat.dto.common.VoucherTransaction;
import com.lemoo.chat.event.event.model.NewShareVoucherEvent;
import com.lemoo.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PromotionConsumer {

    private final MessageService messageService;

    @KafkaListener(topics = "promotion-service.voucher.share", groupId = "${spring.kafka.consumer.group-id}")
    public void shareVoucherEventListener(NewShareVoucherEvent event) {
        messageService.createVoucherMessage(
                event.getUserId(),
                event.getTargetId(),
                VoucherTransaction.builder()
                        .roomId(event.getChatId())
                        .targetId(event.getTargetId())
                        .transactionId(event.getTransactionId())
                        .userId(event.getUserId())
                        .voucherId(event.getVoucherId())
                        .build()
        );
    }
}
