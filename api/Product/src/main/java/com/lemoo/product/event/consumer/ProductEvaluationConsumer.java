/*
 *  ProductEvaluationConsumer
 *  @author: Minhhieuano
 *  @created 3/12/2025 3:27 AM
 * */


package com.lemoo.product.event.consumer;

import com.lemoo.product.event.eventModel.ProductEvaluatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductEvaluationConsumer {
    @KafkaListener(topics = "product-evaluation-worker.evaluation-success", groupId = "${spring.kafka.consumer.group-id}")
    public void productEvaluationSuccessEventListener(ProductEvaluatedEvent event) {
        System.out.println("event = " + event);
    }

    @KafkaListener(topics = "product-evaluation-worker.evaluation-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void productEvaluationFailedEventListener(ProductEvaluatedEvent event) {
        System.out.println("event = " + event);
    }
}
