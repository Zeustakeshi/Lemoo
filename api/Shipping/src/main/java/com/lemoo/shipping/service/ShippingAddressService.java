/*
 *  ShippingAddressService
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:10 AM
 * */


package com.lemoo.shipping.service;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.PageableResponse;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;
import com.lemoo.shipping.entity.BasePartialAddress;

import java.util.List;

public interface ShippingAddressService {

    List<BasePartialAddress> getProvinces();

    List<BasePartialAddress> getDistricts();

    List<BasePartialAddress> getWards(String districtCode);

    ShippingAddressResponse createShippingAddress(AuthenticatedAccount account, ShippingAddressRequest request);

    PageableResponse<ShippingAddressResponse> getAllShipAddress(AuthenticatedAccount account, int page, int limit);

    void updateDefaultAddress(AuthenticatedAccount account, String addressId);
}
