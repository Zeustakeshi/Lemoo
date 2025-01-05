/*
 *  SkuHashCache
 *  @author: Minhhieuano
 *  @created 1/2/2025 4:28 PM
 * */


package com.lemoo.product.dto.common;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSkuHashCache {
    private String id;

    private String skuCode;

    private String name;

    @Builder.Default
    private String image = "";
    
    private Map<String, String> variants;
    private Long price;
    private Long stock;
    private Long totalSold;
}
