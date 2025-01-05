/*
 *  ProductCache
 *  @author: Minhhieuano
 *  @created 1/2/2025 4:15 PM
 * */


package com.lemoo.product.dto.common;

import com.lemoo.product.common.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductHashCache {
    private String id;
    private String name;
    private String thumbnail;
    private Double rating = 0.0;
    private String storeId;
    private ProductStatus status;
}
