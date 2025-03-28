/*
 *  ShippingAddressImpl
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:14 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.client.GhnClient;
import com.lemoo.shipping.dto.response.GhnApiResponse;
import com.lemoo.shipping.entity.BasePartialAddress;
import com.lemoo.shipping.service.ShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService {
    private final GhnClient ghnClient;

    @Override
    public List<BasePartialAddress> getProvinces() {
        GhnApiResponse<List<HashMap<Object, Object>>> response = ghnClient.getProvince();
        return response.getData().stream().map(data ->
                new BasePartialAddress(
                        data.get("ProvinceID").toString(),
                        data.get("ProvinceName").toString()
                )
        ).toList();
    }

    @Override
    public List<BasePartialAddress> getDistricts(String provinceCode) {
        GhnApiResponse<List<HashMap<Object, Object>>> response = ghnClient.getDistrict(provinceCode);
        return response.getData().stream().map(data ->
                new BasePartialAddress(
                        data.get("DistrictID").toString(),
                        data.get("DistrictName").toString()
                )
        ).toList();
    }

    @Override
    public List<BasePartialAddress> getWards(String districtCode) {
        GhnApiResponse<List<HashMap<Object, Object>>> response = ghnClient.getWard(districtCode);
        return response.getData().stream().map(data ->
                new BasePartialAddress(
                        data.get("WardCode").toString(),
                        data.get("WardName").toString()
                )
        ).toList();
    }

}
