/*
 *  CartResponse
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:34 AM
 * */


package com.lemoo.order_v2.dto.response;

import com.lemoo.order_v2.common.enums.CartItemStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemResponse {
    private String id;
    private String storeId;
    private String productId;
    private Integer quantity;
    private CartItemStatus status;
    private CartSkuResponse sku;
}
