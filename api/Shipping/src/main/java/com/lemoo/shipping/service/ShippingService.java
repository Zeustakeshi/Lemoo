/*
 *  ShippingService
 *  @author: pc
 *  @created 4/9/2025 12:01 AM
 * */

package com.lemoo.shipping.service;

import com.lemoo.shipping.dto.common.AuthenticatedAccount;
import com.lemoo.shipping.dto.response.ShippingOrderResponse;

import java.util.Map;

public interface ShippingService {

    ShippingOrderResponse getShippingOrderByOrderId(String orderId, AuthenticatedAccount account);

    void createShippingOrder(
            String orderId,
            String storeId,
            String userId,
            String shippingAddressId,
            Map<String, Integer> skus
    );
}
