/*
 *  OrderItem
 *  @author: Minhhieuano
 *  @created 3/11/2025 12:35 AM
 * */


package com.lemoo.order_v2.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItem {
    private String id;
    private String skuCode;
    private String skuName;
    private String image;
    private Long price;
    private Integer quantity;
}
