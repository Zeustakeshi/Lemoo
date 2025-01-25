/*
 *  Cart
 *  @author: Minhhieuano
 *  @created 1/25/2025 7:10 AM
 * */


package com.lemoo.order.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "cart")
public class Cart extends BaseEntity {
    @Column(nullable = false)
    private String userId;
    
}

