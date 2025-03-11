/*
 *  ShippingAddressServiceImpl
 *  @author: Minhhieuano
 *  @created 3/11/2025 12:59 AM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.client.ShippingClient;
import com.lemoo.order_v2.dto.response.ShippingAddressResponse;
import com.lemoo.order_v2.helper.ShippingAddressHelper;
import com.lemoo.order_v2.mapper.ShippingAddressMapper;
import com.lemoo.order_v2.service.ShippingAddressService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService {

    private final ShippingClient shippingClient;
    private final RedissonClient redisson;
    private final ShippingAddressMapper shippingAddressMapper;

    @Override
    public ShippingAddressResponse getShippingAddressByIdAndUserId(String addressId, String userId) {
        RMap<String, String> rMap = redisson.getMap(
                ShippingAddressHelper.getShippingAddressCacheKey(addressId, userId)
        );

        if (rMap.isExists()) {
            return shippingAddressMapper.toShippingAddressResponse(rMap.readAllMap());
        } else {
            ShippingAddressResponse shippingAddressResponse = shippingClient
                    .getShippingAddressByIdAndUserId(addressId, userId)
                    .getData();
            rMap.putAll(shippingAddressMapper.toShippingAddressMap(shippingAddressResponse));
            rMap.expire(Duration.ofDays(7));
            
            return shippingAddressResponse;
        }
    }
}
