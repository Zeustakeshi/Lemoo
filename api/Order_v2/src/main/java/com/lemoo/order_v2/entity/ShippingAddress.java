/*
 *  OrderAddress
 *  @author: Minhhieuano
 *  @created 3/11/2025 12:37 AM
 * */


package com.lemoo.order_v2.entity;

import com.lemoo.order_v2.dto.common.Address;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShippingAddress {
    private String id;
    private Address address;
    private String recipientName;
    private String recipientPhone;
}
