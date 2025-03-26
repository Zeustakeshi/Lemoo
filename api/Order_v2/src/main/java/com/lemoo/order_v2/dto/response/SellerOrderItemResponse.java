/*
 *  SellerOrderItemResponse
 *  @author: pc
 *  @created 3/26/2025 10:52 AM
 * */


package com.lemoo.order_v2.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerOrderItemResponse {
    private String lemooSku;
    private String image;
    private String skuName;
    private Integer price;
    private Integer quantity;
}
