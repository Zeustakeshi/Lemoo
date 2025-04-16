/*
 *  ProductAnalyisResultEvent
 *  @author: pc
 *  @created 4/16/2025 11:37 AM
 * */


package com.lemoo.product.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductAnalysisResultEvent extends Event {
    private String productId;
    private String message;
}
