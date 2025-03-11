/*
 *  PlaceOrderRequest
 *  @author: Minhhieuano
 *  @created 3/10/2025 11:51 PM
 * */


package com.lemoo.order_v2.dto.request;

import com.lemoo.order_v2.common.enums.PaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class OrderRequest {
    @NotEmpty
    private Set<OrderItemRequest> items;

    @NotEmpty
    private PaymentMethod paymentMethod;

    @NotNull
    private Set<String> promotions;

    @NotNull
    private String shippingAddressId;
}
