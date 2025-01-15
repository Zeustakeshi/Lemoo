/*
 *  ShippingAddressService
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:10 AM
 * */


package com.lemoo.shipping.service;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;

public interface ShippingAddressService {

    ShippingAddressResponse createShippingAddress(AuthenticatedAccount account, ShippingAddressRequest request);

}
