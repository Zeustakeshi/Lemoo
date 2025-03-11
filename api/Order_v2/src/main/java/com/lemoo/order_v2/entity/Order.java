/*
 *  Order
 *  @author: Minhhieuano
 *  @created 3/11/2025 12:24 AM
 * */


package com.lemoo.order_v2.entity;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.common.enums.PaymentMethod;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
@Builder
public class Order extends BaseEntity {
    @Indexed
    private String userId;

    private Set<OrderItem> items = new HashSet<>();
    private Set<String> promotions;
    private ShippingAddress shippingAddress;
    private PaymentMethod paymentMethod;


    @Indexed
    private OrderStatus status;

    public Long getTotal() {
        return items.stream()
                .mapToLong(item -> item.getPrice() * item.getQuantity())
                .sum();
    }
}
