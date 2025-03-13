/*
 *  ProductEvaluationConsumer
 *  @author: Minhhieuano
 *  @created 3/12/2025 3:27 AM
 * */


package com.lemoo.product.event.consumer;

import com.lemoo.product.event.eventModel.ProductEvaluatedEvent;
import com.lemoo.product.service.ProductEvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductEvaluationConsumer {

    private final ProductEvaluationService productEvaluationService;

    @KafkaListener(topics = "product-evaluation-worker.evaluation-success", groupId = "${spring.kafka.consumer.group-id}")
    public void productEvaluationSuccessEventListener(ProductEvaluatedEvent event) {
        productEvaluationService.handleEvaluationSuccess(event.getProductId(), event.getScore(), event.getNote());
    }

    @KafkaListener(topics = "product-evaluation-worker.evaluation-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void productEvaluationFailedEventListener(ProductEvaluatedEvent event) {
        productEvaluationService.handleEvaluationFailed(event.getProductId(), event.getScore(), event.getNote());
    }
}
