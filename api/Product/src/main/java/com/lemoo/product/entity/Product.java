/*
 *  Product
 *  @author: Minhhieuano
 *  @created 12/14/2024 12:05 AM
 * */

package com.lemoo.product.entity;

import com.lemoo.product.common.enums.ProductStatus;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "products")
@CompoundIndex(name = "product_name_store_id_idx", unique = true, def = "{'name': 1, 'storeId': 1}")
public class Product extends BaseEntity {

    @Indexed
    private String name;

    private String description;

    private List<String> categories;

    private ProductMedia smallImage;

    private List<ProductMedia> images;

    @Builder.Default
    private Integer score = 0;

    @Builder.Default
    private ProductStatus status = ProductStatus.DRAFT;

    @Indexed
    private String storeId;

    private List<ProductVariant> variants;
}
