/*
 *  ProductDetailResponse
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:28 PM
 * */


package com.lemoo.product.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lemoo.product.entity.ProductVariant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDetailResponse {
    private String id;
    private String name;
    private List<String> images;
    private String description;
    private String storeId;
    private Long totalSold;
    private Double ratting;
    private Long rattingCount;

    @Builder.Default
    @JsonProperty("isSoldOut")
    private boolean isSoldOut = false;
    private List<ProductVariant> variants;
    private List<ProductSkuResponse> skus;
}
