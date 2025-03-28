/*
 *  ShippingAddressService
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:10 AM
 * */


package com.lemoo.shipping.service;

import com.lemoo.shipping.entity.BasePartialAddress;

import java.util.List;

public interface ShippingAddressService {

    List<BasePartialAddress> getProvinces();

    List<BasePartialAddress> getDistricts(String provinceCode);

    List<BasePartialAddress> getWards(String districtCode);
    
}
