/*
 *  ProductEvaluationProducer
 *  @author: Minhhieuano
 *  @created 3/12/2025 1:03 AM
 * */


package com.lemoo.product.event.producer;

import com.lemoo.product.event.eventModel.ProductEvaluationEvent;
import com.lemoo.product.mapper.ProductEvaluationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductEvaluationProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final ProductEvaluationMapper productEvaluationMapper;

    public void evaluationProduct(ProductEvaluationEvent event) {
        kafkaTemplate.send("product-service.evaluation-product", event);
    }

}
