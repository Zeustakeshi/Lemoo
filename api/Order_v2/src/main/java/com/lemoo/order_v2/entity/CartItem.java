/*
 *  Cart
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:36 PM
 * */


package com.lemoo.order_v2.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
@Builder
public class CartItem extends BaseEntity {
    private String cardId;
    private String userId;
    private String storeId;
    private String productId;
    private String skuCode;
    private String quantity;
}
