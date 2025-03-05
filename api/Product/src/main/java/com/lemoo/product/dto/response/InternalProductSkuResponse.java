/*
 *  IntenalProductSkuResponse
 *  @author: Minhhieuano
 *  @created 3/5/2025 4:32 PM
 * */


package com.lemoo.product.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InternalProductSkuResponse {
    private String skuCode;
    private String name;
    private String productId;
    private String storeId;
    private Long price;
    private Long stock;
    private String image;
}
