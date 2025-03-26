/*
 *  SellerOrderService
 *  @author: pc
 *  @created 3/26/2025 10:31 AM
 * */

package com.lemoo.order_v2.service;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.dto.common.AuthenticatedAccount;
import com.lemoo.order_v2.dto.response.PageableResponse;
import com.lemoo.order_v2.dto.response.SellerOrderResponse;

public interface SellerOrderService {
    PageableResponse<SellerOrderResponse> getAllOrderByStoreId(
            String storeId,
            OrderStatus status,
            int page,
            int limit,
            AuthenticatedAccount account
    );
}
