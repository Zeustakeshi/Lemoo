/*
 *  OrderSkuRequest
 *  @author: pc
 *  @created 3/25/2025 11:19 PM
 * */


package com.lemoo.order_v2.dto.request;

import lombok.Data;

@Data
public class OrderSkuRequest {
    private String lemooSku;
    private Integer quantity;
}
