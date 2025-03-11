/*
 *  OrderItemRequest
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:36 AM
 * */


package com.lemoo.order_v2.dto.request;

import lombok.Data;

@Data
public class OrderItemRequest {
    private String lemooSku;
    private Integer quantity;
}
