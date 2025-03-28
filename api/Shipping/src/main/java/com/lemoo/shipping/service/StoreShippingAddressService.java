/*
 *  StoreShippingAddressService
 *  @author: pc
 *  @created 3/29/2025 12:06 AM
 * */


package com.lemoo.shipping.service;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;

public interface StoreShippingAddressService {
    ShippingAddressResponse saveStoreShippingAddress(AuthenticatedAccount account, String storeId, ShippingAddressRequest request);

    ShippingAddressResponse getStoreShippingAddress(AuthenticatedAccount account, String storeId);
}
