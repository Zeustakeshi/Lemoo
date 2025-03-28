/*
 *  ShippingAddressImpl
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:14 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.client.GhnClient;
import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.GhnApiResponse;
import com.lemoo.shipping.dto.response.PageableResponse;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;
import com.lemoo.shipping.entity.BasePartialAddress;
import com.lemoo.shipping.entity.ShippingAddress;
import com.lemoo.shipping.exception.NotfoundException;
import com.lemoo.shipping.mapper.PageMapper;
import com.lemoo.shipping.mapper.ShippingAddressMapper;
import com.lemoo.shipping.repository.ShippingAddressRepository;
import com.lemoo.shipping.service.ShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService {
    private final ShippingAddressRepository shippingAddressRepository;
    private final ShippingAddressMapper shippingAddressMapper;
    private final PageMapper pageMapper;
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

    @Override
    public ShippingAddressResponse createShippingAddress(AuthenticatedAccount account, ShippingAddressRequest request) {
        ShippingAddress shippingAddress = shippingAddressMapper.toShippingAddress(request);

        if (!shippingAddressRepository.existsByUserId(account.getUserId())) {
            shippingAddress.setIsDefault(true);
        }
        shippingAddress.setUserId(account.getUserId());

        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.save(shippingAddress));
    }

    @Override
    public PageableResponse<ShippingAddressResponse> getAllShipAddress(AuthenticatedAccount account, int page, int limit) {
        PageRequest request = PageRequest.of(page, limit);
        Page<?> shippingAddresses = shippingAddressRepository.findAllByUserId(account.getUserId(), request);
        return pageMapper.toPageableResponse(shippingAddresses);
    }

    @Override
    public void updateDefaultAddress(AuthenticatedAccount account, String addressId) {
        ShippingAddress address = shippingAddressRepository.findById(addressId)
                .orElseThrow(() -> new NotfoundException("Address not found"));

        ShippingAddress oldDefaultAddress = shippingAddressRepository.
                findByUserIdAndIsDefault(account.getUserId(), true)
                .orElse(null);

        if (oldDefaultAddress != null) {
            oldDefaultAddress.setIsDefault(false);
            shippingAddressRepository.save(oldDefaultAddress);
        }

        address.setIsDefault(true);

        shippingAddressRepository.save(address);

    }
}
