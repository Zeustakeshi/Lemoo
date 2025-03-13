/*
 *  ProductEvaluationNotificationEvent
 *  @author: Minhhieuano
 *  @created 3/13/2025 10:44 AM
 * */


package com.lemoo.notification.event.model;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductEvaluationNotificationEvent extends Event {
    private String storeId;
    private boolean isSuccess;
    private String note;
    private String productName;
    private String productId;
    private String productImage;
}
