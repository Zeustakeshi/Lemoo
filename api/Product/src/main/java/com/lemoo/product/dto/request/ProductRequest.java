/*
 *  ProductRequest
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:32 PM
 * */

package com.lemoo.product.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ProductRequest {

    @NotEmpty
    @Size(min = 5, max = 200)
    private String name;

    @NotEmpty
    @Size(min = 5, max = 10000)
    private String description;

    @NotEmpty
    private String categoryId;

    @NotNull
    private MediaRequest smallImage;

    @Size(min = 1, max = 8)
    @NotEmpty
    @NotNull
    private Set<MediaRequest> images;

    @NotNull
    @NotEmpty
    @Size(min = 1, max = 9)
    private List<ProductSkuRequest> skus;

    @Size(min = 1)
    private List<ProductVariantRequest> variants;
}
