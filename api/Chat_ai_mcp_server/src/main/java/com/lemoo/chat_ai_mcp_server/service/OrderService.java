/*
 *  OrderService
 *  @author: pc
 *  @created 4/21/2025 7:55 PM
 * */


package com.lemoo.chat_ai_mcp_server.service;

import com.lemoo.chat_ai_mcp_server.client.OrderClient;
import com.lemoo.chat_ai_mcp_server.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderClient orderClient;

    @Tool(
            name = "findAllUserOrder",
            description = "Retrieves a paginated list of all orders for a specific user based on their user ID. The tool returns an API response containing order details including order ID, items, total amount, payment method, order status, order date, store ID, and applied vouchers. The results are paginated, with 'page' specifying the page number (starting from 0) and 'limit' specifying the number of orders per page. Default values are page = 0 and limit = 20."
    )
    public ApiResponse<?> findAllUserOrder(String userId, int page, int limit) {
        return ApiResponse.success(orderClient.getAllUserOrder(userId, page, limit));
    }
}
