/*
 *  ShippingAddressResponse
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:15 AM
 * */


package com.lemoo.shipping.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lemoo.shipping.common.enums.ShippingAddressType;
import com.lemoo.shipping.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShippingAddressResponse {
    private String id;
    private String recipientName;
    private String recipientPhone;
    private Address address;

    @Builder.Default
    @JsonProperty("isDefault")
    private Boolean isDefault = true;
    private ShippingAddressType type;
}
