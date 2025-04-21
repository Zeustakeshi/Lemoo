/*
 *  InternalOrderService
 *  @author: pc
 *  @created 4/21/2025 7:57 PM
 * */

package com.lemoo.order_v2.service;


import com.lemoo.order_v2.dto.response.OrderResponse;
import com.lemoo.order_v2.dto.response.PageableResponse;

public interface InternalOrderService {
    PageableResponse<OrderResponse> getAllOrders(String userId, int page, int limit);
}
