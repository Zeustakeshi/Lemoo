/*
 *  ProductEvaluationProducer
 *  @author: Minhhieuano
 *  @created 3/12/2025 1:03 AM
 * */


package com.lemoo.product.event.producer;

import com.lemoo.product.event.eventModel.ProductAnalysisEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductAnalysisProducer {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void analyzeProduct(ProductAnalysisEvent event) {
        kafkaTemplate.send("product-service.analyze-product", event);
    }

}
