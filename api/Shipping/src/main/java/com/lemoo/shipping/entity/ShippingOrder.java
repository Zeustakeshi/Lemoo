/*
 *  ShippingOrder
 *  @author: pc
 *  @created 4/14/2025 4:00 PM
 * */


package com.lemoo.shipping.entity;

import com.lemoo.shipping.common.enums.ShippingOrderStatus;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShippingOrder extends BaseEntity {
    private String content;
    private String shippingOrderCode;
    private Long totalFee;
    private String orderId;
    private String userId;
    private String shippingAddressId;
    private Long codAmount;
    private Set<ShippingOrderLog> logs;
    private LocalDateTime expectedDeliveryTime;
    private LocalDateTime orderDate;
    private LocalDateTime finishDate;
    private LocalDateTime pickupTime;
    private LeadtimeOrder leadtimeOrder;


    @Builder.Default
    private ShippingOrderStatus status = ShippingOrderStatus.READY_TO_PICK;

    @Data
    public static class LeadtimeOrder {
        private String from_estimate_date;
        private String to_estimate_date;
        private String picked_date;
    }
}
