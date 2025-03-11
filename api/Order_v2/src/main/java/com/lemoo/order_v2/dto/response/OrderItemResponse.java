/*
 *  OrderItemResponse
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:58 PM
 * */


package com.lemoo.order_v2.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemResponse {
    private String lemooSku;
    private String image;
    private String storeId;
    private Integer quantity;
    private Long price;
}
