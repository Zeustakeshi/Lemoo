/*
 *  AddressMapper
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:01 AM
 * */


package com.lemoo.order_v2.mapper;


import com.lemoo.order_v2.dto.response.ShippingAddressResponse;
import com.lemoo.order_v2.entity.ShippingAddress;
import org.mapstruct.Mapper;

import java.util.Map;

@Mapper
public abstract class ShippingAddressMapper {

    public Map<String, String> toShippingAddressMap(ShippingAddressResponse response) {
        return Map.of(
                "id", response.getId(),
                "address", response.getAddress(),
                "recipientName", response.getRecipientName(),
                "recipientPhone", response.getRecipientPhone()
        );
    }

    public ShippingAddressResponse toShippingAddressResponse(Map<String, String> addressMap) {
        return ShippingAddressResponse.builder()
                .id(addressMap.get("id"))
                .address(addressMap.get("address"))
                .recipientName(addressMap.get("recipientName"))
                .recipientPhone(addressMap.get("recipientPhone"))
                .build();
    }

    public abstract ShippingAddress toShippingAddress(ShippingAddressResponse shippingAddressResponse);

    public abstract ShippingAddressResponse toShippingAddressResponse(ShippingAddress shippingAddress);
}
