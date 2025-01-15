/*
 *  ShippingAddressImpl
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:14 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;
import com.lemoo.shipping.entity.ShippingAddress;
import com.lemoo.shipping.mapper.ShippingAddressMapper;
import com.lemoo.shipping.repository.ShippingAddressRepository;
import com.lemoo.shipping.service.ShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService {
    private final ShippingAddressRepository shippingAddressRepository;
    private final ShippingAddressMapper shippingAddressMapper;

    @Override
    public ShippingAddressResponse createShippingAddress(AuthenticatedAccount account, ShippingAddressRequest request) {
        ShippingAddress shippingAddress = shippingAddressMapper.toShippingAddress(request);

        if (!shippingAddressRepository.existsByUserId(account.getUserId())) {
            shippingAddress.setIsDefault(true);
        }
        shippingAddress.setUserId(account.getUserId());

        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.save(shippingAddress));
    }
}
