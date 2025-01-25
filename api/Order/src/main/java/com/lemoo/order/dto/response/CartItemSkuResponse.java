/*
 *  CartItemSkuResponse
 *  @author: Minhhieuano
 *  @created 1/26/2025 12:25 AM
 * */


package com.lemoo.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemSkuResponse {
    private String lemooSku;
    private String productId;
    private String image;
    private Long quantity;
    private Long price;
}
