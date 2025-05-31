/*
 *  InternalShippingServiceImpl
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:14 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.dto.response.InternalShippingAddressResponse;
import com.lemoo.shipping.entity.ShippingAddress;
import com.lemoo.shipping.exception.NotfoundException;
import com.lemoo.shipping.mapper.ShippingAddressMapper;
import com.lemoo.shipping.repository.ShippingAddressRepository;
import com.lemoo.shipping.service.InternalShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InternalShippingAddressServiceImpl implements InternalShippingAddressService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final ShippingAddressMapper shippingAddressMapper;

    @Override
    public InternalShippingAddressResponse getShippingAddressByIdAndUserId(String addressId, String userId) {
        var shippingAddress = shippingAddressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new NotfoundException("Shipping address not found"));
        return shippingAddressMapper.toInternalShippingAddressResponse(shippingAddress);
    }

    @Override
    public List<InternalShippingAddressResponse> getAllShippingAddress(String userId) {
        List<ShippingAddress> shippingAddresses = shippingAddressRepository.findAllByUserId(userId);
        return shippingAddresses.stream().map(shippingAddressMapper::toInternalShippingAddressResponse).toList();
    }
}
