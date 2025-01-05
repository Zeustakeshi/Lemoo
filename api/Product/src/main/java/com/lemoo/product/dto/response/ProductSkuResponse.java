/*
 *  ProductSkuResponse
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:30 PM
 * */


package com.lemoo.product.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSkuResponse {
    private String lemooSku;
    private String name;
    private String image;
    private Long originPrice;
    private Long promotionPrice;
    private Map<String, String> variants;
}
