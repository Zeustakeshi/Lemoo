/*
 *  StoreShippingAddressServiceImpl
 *  @author: pc
 *  @created 3/29/2025 12:07 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;
import com.lemoo.shipping.entity.ShippingAddress;
import com.lemoo.shipping.exception.NotfoundException;
import com.lemoo.shipping.mapper.ShippingAddressMapper;
import com.lemoo.shipping.repository.ShippingAddressRepository;
import com.lemoo.shipping.service.StoreService;
import com.lemoo.shipping.service.StoreShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreShippingAddressServiceImpl implements StoreShippingAddressService {

    private final StoreService storeService;
    private final ShippingAddressRepository shippingAddressRepository;
    private final ShippingAddressMapper shippingAddressMapper;

    @Override
    public ShippingAddressResponse saveStoreShippingAddress(AuthenticatedAccount account, String storeId, ShippingAddressRequest request) {
        storeService.verifyStore(account.getId(), storeId);
        ShippingAddress shippingAddress = shippingAddressRepository.findByUserId(storeId)
                .orElse(shippingAddressMapper.toShippingAddress(request));
        shippingAddress.setUserId(storeId);
        shippingAddressRepository.save(shippingAddress);
        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.save(shippingAddress));
    }

    @Override
    public ShippingAddressResponse getStoreShippingAddress(AuthenticatedAccount account, String storeId) {
        storeService.verifyStore(account.getId(), storeId);
        ShippingAddress shippingAddress = shippingAddressRepository.findByUserId(storeId)
                .orElseThrow(() -> new NotfoundException("The store has not registered a delivery address."));
        return shippingAddressMapper.toShippingAddressResponse(shippingAddress);
    }
}
