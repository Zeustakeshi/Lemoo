/*
 *  ShippingAddressService
 *  @author: Minhhieuano
 *  @created 3/11/2025 12:59 AM
 * */

package com.lemoo.order_v2.service;

import com.lemoo.order_v2.dto.response.ShippingAddressResponse;

public interface ShippingAddressService {
    ShippingAddressResponse getShippingAddressByIdAndUserId(String addressId, String userId);
}
