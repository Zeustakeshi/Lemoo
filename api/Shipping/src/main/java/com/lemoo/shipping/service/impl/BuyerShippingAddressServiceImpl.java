/*
 *  BuyerShippingAddressServiceImpl
 *  @author: pc
 *  @created 3/29/2025 12:01 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.request.ShippingAddressRequest;
import com.lemoo.shipping.dto.response.PageableResponse;
import com.lemoo.shipping.dto.response.ShippingAddressResponse;
import com.lemoo.shipping.entity.ShippingAddress;
import com.lemoo.shipping.exception.NotfoundException;
import com.lemoo.shipping.mapper.PageMapper;
import com.lemoo.shipping.mapper.ShippingAddressMapper;
import com.lemoo.shipping.repository.ShippingAddressRepository;
import com.lemoo.shipping.service.BuyerShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BuyerShippingAddressServiceImpl implements BuyerShippingAddressService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final ShippingAddressMapper shippingAddressMapper;
    private final PageMapper pageMapper;

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
