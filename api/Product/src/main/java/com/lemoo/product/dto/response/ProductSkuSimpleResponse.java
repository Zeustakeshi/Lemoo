/*
 *  ProductSkuSimpleResponse
 *  @author: Minhhieuano
 *  @created 12/29/2024 12:45 PM
 * */


package com.lemoo.product.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductSkuSimpleResponse {
    private String lemooSku;
    private String sellerSku;
}
