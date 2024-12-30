/*
 *  ProductResponse
 *  @author: Minhhieuano
 *  @created 12/14/2024 2:06 PM
 * */

package com.lemoo.product.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSimpleResponse {
    private String id;
    private List<ProductSkuSimpleResponse> skus;
    private LocalDateTime updatedAt;
}
