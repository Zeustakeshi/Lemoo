/*
 *  ProductVariant
 *  @author: Minhhieuano
 *  @created 12/14/2024 10:30 AM
 * */

package com.lemoo.product.entity;

import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@CompoundIndex(unique = true, def = "{'sellerSku': 1, 'productId': 1}")
@CompoundIndex(unique = true, def = "{'sellerSku': 1, 'storeId': 1}")
public class ProductSku extends BaseEntity {

    @Indexed(unique = true)
    private String skuCode;

    private String sellerSku;

    @Indexed
    private String name;

    private ProductMedia image;

    @Indexed
    private String productId;

    @Indexed
    private String storeId;

    private boolean allowSale;

    private Long price;
    private Long specialPrice;
    private LocalDateTime specialFromDate;
    private LocalDateTime specialToDate;

    private Long stock;
    private Double packageWidth; // cm
    private Double packageHeight; // cm
    private Double packageLength; // cm
    private Double packageWeight; // g

    private Map<String, String> variants; // {"color": "red", "size": "M"}
}
