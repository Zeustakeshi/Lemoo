/*
 *  CartResponse
 *  @author: Minhhieuano
 *  @created 1/26/2025 12:21 AM
 * */


package com.lemoo.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponse {
    private String id;
    private List<CartItemResponse> items;
}
