/*
 *  ProductAnalysisConsumer
 *  @author: pc
 *  @created 4/16/2025 11:36 AM
 * */


package com.lemoo.product.event.consumer;

import com.lemoo.product.event.eventModel.ProductAnalysisResultEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductAnalysisConsumer {
    @KafkaListener(topics = "product-analysis-worker.analysis-success", groupId = "${spring.kafka.consumer.group-id}")
    public void productAnalysisSuccessEventListener(ProductAnalysisResultEvent event) {
        System.out.println(event.getMessage());
    }

    @KafkaListener(topics = "product-analysis-worker.analysis-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void productAnalysisFailedEventListener(ProductAnalysisResultEvent event) {
        System.out.println(event.getMessage());
    }
}
