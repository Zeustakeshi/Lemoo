/*
 *  ShippingAddressMapper
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:17 AM
 * */

package com.lemoo.shipping.mapper;

import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.InternalShippingAddressResponse;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;
import com.lemoo.shipping.entity.ShippingAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper()
public interface ShippingAddressMapper {

    @Mapping(target = "isDefault", defaultValue = "false")
    ShippingAddressResponse toShippingAddressResponse(ShippingAddress shippingAddress);

    ShippingAddress toShippingAddress(ShippingAddressRequest request);

    default InternalShippingAddressResponse toInternalShippingAddressResponse(ShippingAddress shippingAddress) {
        return InternalShippingAddressResponse.builder()
                .id(shippingAddress.getId())
                .address(shippingAddress.getAddress())
                .recipientName(shippingAddress.getRecipientName())
                .recipientPhone(shippingAddress.getRecipientPhone())
                .build();
    }
}
