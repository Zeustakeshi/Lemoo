/*
 *  InternalShippingAddressResponse
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:13 AM
 * */


package com.lemoo.shipping.dto.response;

import com.lemoo.shipping.entity.Address;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InternalShippingAddressResponse {
    private String id;
    private Address address;
    private String recipientName;
    private String recipientPhone;
}
