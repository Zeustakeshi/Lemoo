/*
 *  OrderSkuRequest
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:01 AM
 * */


package com.lemoo.order.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderItemRequest {

    @NotEmpty
    private String lemooSku;

    @NotEmpty
    private String productId;

    @Min(1)
    @NotNull
    private Integer quantity;
}
