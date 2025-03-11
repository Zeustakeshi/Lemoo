/*
 *  InternalShippingServiceImpl
 *  @author: Minhhieuano
 *  @created 3/11/2025 2:14 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.dto.response.InternalShippingAddressResponse;
import com.lemoo.shipping.exception.NotfoundException;
import com.lemoo.shipping.mapper.ShippingAddressMapper;
import com.lemoo.shipping.repository.ShippingAddressRepository;
import com.lemoo.shipping.service.InternalShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternalShippingServiceImpl implements InternalShippingService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final ShippingAddressMapper shippingAddressMapper;

    @Override
    public InternalShippingAddressResponse getShippingAddressByIdAndUserId(String addressId, String userId) {
        var shippingAddress = shippingAddressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new NotfoundException("Shipping address not found"));
        return shippingAddressMapper.toInternalShippingAddressResponse(shippingAddress);
    }
}
