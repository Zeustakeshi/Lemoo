/*
 *  CartItemSku
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:53 AM
 * */


package com.lemoo.order.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class CartItemSku extends BaseEntity {

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private CartItem cartItem;

    @Column(nullable = false)
    private String skuCode;

    private String image;

    @Column(nullable = false)
    private String productId;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private Long price;
}
