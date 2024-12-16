/*
 *  ProductOverviewResponse
 *  @author: Minhhieuano
 *  @created 12/16/2024 1:05 AM
 * */


package com.lemoo.product.dto.response;

import com.lemoo.product.common.enums.ProductStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProductResponse {
    private String id;
    private String productSku;
    private String name;
    private String image;
    private ProductStatus status;
    private List<ProductVariantResponse> variants;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
