/*
 *  CartItem
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:51 AM
 * */


package com.lemoo.order.entity;


import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class CartItem extends BaseEntity {
    @Column(nullable = false)
    private String storeId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cart cart;
}
