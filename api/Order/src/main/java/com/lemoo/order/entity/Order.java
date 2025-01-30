/*
 *  Order
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:06 AM
 * */


package com.lemoo.order.entity;

import com.lemoo.order.common.enums.OrderPaymentMethod;
import com.lemoo.order.common.enums.OrderProcessStatus;
import com.lemoo.order.common.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "order")
public class Order extends BaseEntity {

    @Column(nullable = false)
    private String userId;

    @Builder.Default
    @ElementCollection
    private Set<String> promotions = new HashSet<>();

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private OrderProcessStatus processStatus = OrderProcessStatus.PENDING_PROMOTION_CHECK;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PROCESSING;

    @CreationTimestamp
    private LocalDateTime orderDate;

    @Column(nullable = false)
    private String shippingAddressId;

    private String customerNote;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private OrderPaymentMethod paymentMethod = OrderPaymentMethod.COD;

    private Integer totalItems;

    private Long totalPrice;

}
