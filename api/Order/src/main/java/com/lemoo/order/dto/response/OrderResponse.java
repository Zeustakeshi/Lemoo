/*
 *  OrderResponse
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:21 AM
 * */


package com.lemoo.order.dto.response;

import com.lemoo.order.common.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private String id;
    private LocalDateTime orderDate;
    private Integer totalItems;
    private OrderStatus status;
}
