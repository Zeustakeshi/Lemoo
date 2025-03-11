/*
 *  ProductEvaluationEvent
 *  @author: Minhhieuano
 *  @created 3/12/2025 12:46 AM
 * */


package com.lemoo.product.event.eventModel;

import com.lemoo.product.domain.ProductSkuEvaluation;
import lombok.*;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductEvaluationEvent extends Event {
    private String productId;
    private String name;
    private String description;
    private String categories;
    private Set<ProductSkuEvaluation> skus;
}
