/*
 *  InternalShippingService
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:12 AM
 * */

package com.lemoo.shipping.service;

import com.lemoo.shipping.dto.response.InternalShippingAddressResponse;

public interface InternalShippingService {
    InternalShippingAddressResponse getShippingAddressByIdAndUserId(String addressId, String userId);
}
