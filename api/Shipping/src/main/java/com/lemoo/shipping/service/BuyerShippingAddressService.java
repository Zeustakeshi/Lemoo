/*
 *  BuyerShippingAddressService
 *  @author: pc
 *  @created 3/29/2025 12:00 AM
 * */

package com.lemoo.shipping.service;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.PageableResponse;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;

public interface BuyerShippingAddressService {
    ShippingAddressResponse createShippingAddress(AuthenticatedAccount account, ShippingAddressRequest request);

    PageableResponse<ShippingAddressResponse> getAllShipAddress(AuthenticatedAccount account, int page, int limit);

    void updateDefaultAddress(AuthenticatedAccount account, String addressId);
}
