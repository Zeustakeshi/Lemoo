/*
 *  OrderItemRequest
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:36 AM
 * */


package com.lemoo.order_v2.dto.request;

import lombok.Data;

import java.util.Set;

@Data
public class OrderItemRequest {
    private String storeId;
    private Set<OrderSkuRequest> skus;
    private Set<String> vouchers;
}
