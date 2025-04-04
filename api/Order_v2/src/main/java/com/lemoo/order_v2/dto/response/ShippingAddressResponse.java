/*
 *  ShippingAddresResponse
 *  @author: Minhhieuano
 *  @created 3/11/2025 12:56 AM
 * */


package com.lemoo.order_v2.dto.response;

import com.lemoo.order_v2.dto.common.Address;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShippingAddressResponse {
    private String id;
    private Address address;
    private String recipientName;
    private String recipientPhone;
}
