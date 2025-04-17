/*
 *  ProductEvaluatedEvent
 *  @author: Minhhieuano
 *  @created 3/12/2025 3:26 AM
 * */


package com.lemoo.product.event.eventModel;

import lombok.*;

import java.util.Map;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductAnalysisEvent extends Event {
    private String productId;
    private String name;
    private String description;
    private Set<String> categories;
    private Store store;
    private Set<ProductSku> skus;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ProductSku {
        private String skuCode;
        private String name;
        private Long price;
        private String image;
        private Map<String, String> variants;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Store {
        private String id;
        private String name;
    }
}
