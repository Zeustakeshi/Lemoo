/*
 *  SellerOrderResponse
 *  @author: Minhhieuano
 *  @created 3/25/2025 2:28 PM
 * */


package com.lemoo.order.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerOrderResponse {
    private String orderId;
    private String lemooSku;
    private String sellerSku;
    private Long quantity;
    private String price;
}
