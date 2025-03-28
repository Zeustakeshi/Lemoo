/*
 *  AddressMapper
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:01 AM
 * */


package com.lemoo.order_v2.mapper;


import com.lemoo.order_v2.dto.common.Address;
import com.lemoo.order_v2.dto.common.BasePartialAddress;
import com.lemoo.order_v2.dto.response.ShippingAddressResponse;
import com.lemoo.order_v2.entity.ShippingAddress;
import org.mapstruct.Mapper;

import java.util.HashMap;
import java.util.Map;

@Mapper
public abstract class ShippingAddressMapper {


    public Map<String, String> toShippingAddressMap(ShippingAddressResponse response) {
        Map<String, String> map = new HashMap<>();
        map.put("id", response.getId());
        map.put("address_province_code", response.getAddress().getProvince().getCode());
        map.put("address_province_name", response.getAddress().getProvince().getName());
        map.put("address_district_code", response.getAddress().getDistrict().getCode());
        map.put("address_district_name", response.getAddress().getDistrict().getName());
        map.put("address_ward_code", response.getAddress().getWard().getCode());
        map.put("address_ward_name", response.getAddress().getWard().getName());
        map.put("address_detail", response.getAddress().getDetail());
        map.put("address_full", response.getAddress().getFullAddress());
        map.put("recipientName", response.getRecipientName());
        map.put("recipientPhone", response.getRecipientPhone());
        return map;
    }

    public ShippingAddressResponse toShippingAddressResponse(Map<String, String> addressMap) {
        return ShippingAddressResponse.builder()
                .id(addressMap.get("id"))
                .address(Address.builder()
                        .province(BasePartialAddress.builder()
                                .code(addressMap.get("address_province_code"))
                                .name(addressMap.get("address_province_name"))
                                .build())
                        .district(BasePartialAddress.builder()
                                .code(addressMap.get("address_district_code"))
                                .name(addressMap.get("address_district_name"))
                                .build())
                        .ward(BasePartialAddress.builder()
                                .code(addressMap.get("address_ward_code"))
                                .name(addressMap.get("address_ward_name"))
                                .build())
                        .detail(addressMap.get("address_detail"))
                        .build())
                .recipientName(addressMap.get("recipientName"))
                .recipientPhone(addressMap.get("recipientPhone"))
                .build();
    }

    public abstract ShippingAddress toShippingAddress(ShippingAddressResponse shippingAddressResponse);

    public abstract ShippingAddressResponse toShippingAddressResponse(ShippingAddress shippingAddress);
}
