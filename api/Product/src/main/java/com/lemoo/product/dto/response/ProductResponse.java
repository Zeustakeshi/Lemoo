/*
 *  ProductResponse
 *  @author: pc
 *  @created 4/23/2025 1:04 PM
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
public class ProductResponse {
    private String id;
    private String name;
    private String thumbnail;
    private Long originPrice;
    private Long promotionPrice;
    private Long totalSold;
    private Double ratting;
    private Long rattingCount;
}
