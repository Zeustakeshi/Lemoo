/*
 *  InternalShippingService
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:12 AM
 * */

package com.lemoo.shipping.service;

import com.lemoo.shipping.dto.response.InternalShippingAddressResponse;

import java.util.List;

public interface InternalShippingAddressService {
    InternalShippingAddressResponse getShippingAddressByIdAndUserId(String addressId, String userId);


    List<InternalShippingAddressResponse> getAllShippingAddress(String userId);
}
