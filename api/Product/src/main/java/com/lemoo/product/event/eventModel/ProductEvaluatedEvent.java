/*
 *  ProductEvaluatedEvent
 *  @author: Minhhieuano
 *  @created 3/12/2025 3:26 AM
 * */


package com.lemoo.product.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductEvaluatedEvent extends Event {
    private String productId;
    private Integer score;
    private String note;
}
