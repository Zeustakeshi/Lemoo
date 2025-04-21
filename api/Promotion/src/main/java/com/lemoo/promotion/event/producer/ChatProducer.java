/*
 *  ChatProducer
 *  @author: pc
 *  @created 4/21/2025 1:12 PM
 * */


package com.lemoo.promotion.event.producer;

import com.lemoo.promotion.event.eventModel.NewShareVoucherEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendNewShareVoucher(NewShareVoucherEvent event) {
        kafkaTemplate.send("promotion-service.voucher.share", event);
    }

}
