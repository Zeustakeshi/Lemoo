/*
 *  OrderResponseDto
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:56 PM
 * */


package com.lemoo.order_v2.dto.response;

import com.lemoo.order_v2.common.enums.PaymentMethod;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
public class OrderResponse {
    private String id;
    private Set<OrderItemResponse> items;
    private Long total;
    private ShippingAddressResponse shippingAddress;
    private PaymentMethod paymentMethod;
    private LocalDateTime createdAt;
}
