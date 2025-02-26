/*
 *  CartSkuResponse
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:35 AM
 * */


package com.lemoo.order_v2.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartSkuResponse {
    private String lemooSku;
    private String name;
    private Long price;
    private String image;
}
