/*
 *  ShippingService
 *  @author: pc
 *  @created 4/9/2025 12:01 AM
 * */

package com.lemoo.shipping.service;

import java.util.Map;

public interface ShippingService {
    void createShippingOrder(
            String orderId,
            String storeId,
            String userId,
            String shippingAddressId,
            Map<String, Integer> skus
    );
}
