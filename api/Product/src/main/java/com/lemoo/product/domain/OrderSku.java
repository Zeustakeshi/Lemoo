/*
 *  OrderSku
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:15 PM
 * */


package com.lemoo.product.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderSku {
    private String skuCode;
    private String productId;
    private Integer quantity;
}
