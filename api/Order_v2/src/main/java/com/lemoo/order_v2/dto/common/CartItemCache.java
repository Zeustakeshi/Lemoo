/*
 *  CartItemCache
 *  @author: Minhhieuano
 *  @created 2/26/2025 9:56 AM
 * */


package com.lemoo.order_v2.dto.common;

import com.lemoo.order_v2.common.enums.CartItemStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemCache {
    private String id;
    private String userId;
    private String productId;
    private String skuCode;
    private Integer quantity;
    private CartItemStatus status;
}
