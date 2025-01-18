/*
 *  OrderErrorMessage
 *  @author: Minhhieuano
 *  @created 1/19/2025 1:36 AM
 * */


package com.lemoo.order.entity;

import jakarta.persistence.Entity;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class OrderErrorMessage extends BaseEntity {
    private String orderId;
    private String message;
}
