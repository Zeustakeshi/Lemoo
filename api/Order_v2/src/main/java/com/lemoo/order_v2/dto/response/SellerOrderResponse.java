/*
 *  SellerOrderResponse
 *  @author: pc
 *  @created 3/26/2025 10:51 AM
 * */


package com.lemoo.order_v2.dto.response;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.common.enums.PaymentMethod;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class SellerOrderResponse {
    private String id;

    private PaymentMethod paymentMethod;

    private LocalDateTime orderDate;

    private OrderStatus status;

    @Builder.Default
    private Set<String> vouchers = new HashSet<>();

    private Set<SellerOrderItemResponse> items;
}
