/*
 *  OrderSkuPayload
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:01 AM
 * */


package com.lemoo.order.event.eventModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderSkuPayload {
    private String skuCode;
    private String productId;
    private Integer quantity;
}
