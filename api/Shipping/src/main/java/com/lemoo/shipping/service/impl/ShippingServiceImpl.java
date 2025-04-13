/*
 *  ShippingServiceImpl
 *  @author: pc
 *  @created 4/9/2025 12:01 AM
 * */


package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.client.GhnClient;
import com.lemoo.shipping.dto.common.ShippingOrderItem;
import com.lemoo.shipping.dto.request.NewShippingOrderRequest;
import com.lemoo.shipping.dto.response.SkuResponse;
import com.lemoo.shipping.dto.response.UserResponse;
import com.lemoo.shipping.entity.ShippingAddress;
import com.lemoo.shipping.exception.NotfoundException;
import com.lemoo.shipping.repository.ShippingAddressRepository;
import com.lemoo.shipping.service.ShippingService;
import com.lemoo.shipping.service.SkuService;
import com.lemoo.shipping.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ShippingServiceImpl implements ShippingService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final UserService userService;
    private final SkuService skuService;
    private final GhnClient ghnClient;

    @Override
    public void createShippingOrder(
            String orderId,
            String storeId,
            String userId,
            String shippingAddressId,
            Map<String, Integer> skus
    ) {
        ShippingAddress shippingAddress = shippingAddressRepository
                .findByIdAndUserId(shippingAddressId, userId)
                .orElseThrow(() -> new NotfoundException("Shipping address not found."));

        UserResponse user = userService.getUserInfo(userId).orElseThrow(() -> new NotfoundException("User " + userId + " not found."));
        Set<SkuResponse> skuResponses = skuService.getSkuByCodes(skus.keySet());

        var shippingOrderRequest = NewShippingOrderRequest.builder()
                .from_name(user.getName())
                .from_ward_code("440307")
                .to_address(shippingAddress.getAddress().getProvince().getName())
                .to_ward_code(shippingAddress.getAddress().getWard().getCode())
                .to_district_name(shippingAddress.getAddress().getDistrict().getName())
                .name("Lemoo-test")
                .quantity(skus.values().stream().mapToInt(Integer::intValue).sum())
                .items(skuResponses.stream().map(sku ->
                        ShippingOrderItem.builder()
                                .code(sku.getSkuCode())
                                .name(sku.getName())
                                .quantity(skus.get(sku.getSkuCode()))
                                .length(sku.getPackageLength())
                                .height(sku.getPackageHeight())
                                .width(sku.getPackageWidth())
                                .weight(sku.getPackageWeight())
                                .build()
                ).toList())
                .build();
        
        ghnClient.createShippingOrder(shippingOrderRequest);
    }
}
