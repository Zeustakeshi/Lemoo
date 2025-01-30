/*
 *  OrderRequest
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:59 AM
 * */


package com.lemoo.order.dto.request;

import com.lemoo.order.common.enums.OrderPaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class OrderRequest {
    @NotEmpty
    private String shippingAddressId;

    @Size(min = 5, max = 2000)
    private String customerNote;

    @NotNull
    private OrderPaymentMethod paymentMethod;

    @NotEmpty
    @Size(min = 1, max = 50)
    private Set<OrderItemRequest> items;

    private Set<String> promotions;
}
