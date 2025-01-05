/*
 *  ProductHomeResponse
 *  @author: Minhhieuano
 *  @created 1/2/2025 12:34 PM
 * */


package com.lemoo.product.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductFeatureResponse {
    private String id;
    private String name;
    private String thumbnail;
    private Long originPrice;
    private Long promotionPrice;
    private Long totalSold;
    private Double ratting;
    private Long rattingCount;
}
