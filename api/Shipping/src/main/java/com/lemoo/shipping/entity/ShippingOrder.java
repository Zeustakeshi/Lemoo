/*
 *  ShippingOrder
 *  @author: pc
 *  @created 4/14/2025 4:00 PM
 * */


package com.lemoo.shipping.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShippingOrder extends BaseEntity {
    private String shippingOrderCode;
    private Long totalFee;
    private LocalDateTime expectedDeliveryTime;
    private String orderId;
    private String userId;
}
