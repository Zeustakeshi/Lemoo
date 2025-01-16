/*
 *  OrderItem
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:13 AM
 * */


package com.lemoo.order.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class OrderItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private String skuCode;

    private String productId;

    private Integer quantity;

    private Long totalPrice;
}
