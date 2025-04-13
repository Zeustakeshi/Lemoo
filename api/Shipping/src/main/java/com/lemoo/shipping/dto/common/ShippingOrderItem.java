/*
 *  ShippingAddressOrderItem
 *  @author: pc
 *  @created 4/13/2025 11:41 PM
 * */


package com.lemoo.shipping.dto.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShippingOrderItem {
    private String name;
    private String code;
    private Integer quantity;
    private Double length;
    private Double width;
    private Double weight;
    private Double height;
}
