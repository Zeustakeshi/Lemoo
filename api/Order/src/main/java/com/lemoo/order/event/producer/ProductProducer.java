/*
 *  PromotionProducer
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:17 AM
 * */


package com.lemoo.order.event.producer;

import com.lemoo.order.event.eventModel.ReserveProductEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductProducer {
    private final KafkaTemplate<String, Object> productReducer;

    public void reserveProduct(ReserveProductEvent event) {
        productReducer.send("product-service.product.reserve-requested", event);
    }

}
