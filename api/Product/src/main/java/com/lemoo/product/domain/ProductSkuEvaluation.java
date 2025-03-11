/*
 *  ProductSkuEvaluation
 *  @author: Minhhieuano
 *  @created 3/12/2025 12:57 AM
 * */


package com.lemoo.product.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class ProductSkuEvaluation {
    private String name;
    private Long price;
    private Long specialPrice;
    private LocalDateTime specialFromDate;
    private LocalDateTime specialToDate;
    private Long stock;
    private Long availableStock;
    private Double packageWidth; // cm
    private Double packageHeight; // cm
    private Double packageLength; // cm
    private Double packageWeight; // g
    private Map<String, String> variants;
}
