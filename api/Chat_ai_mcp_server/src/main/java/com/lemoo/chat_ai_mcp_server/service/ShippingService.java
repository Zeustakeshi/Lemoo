/*
 *  ShippingService
 *  @author: pc
 *  @created 4/22/2025 10:05 PM
 * */


package com.lemoo.chat_ai_mcp_server.service;

import com.lemoo.chat_ai_mcp_server.client.ShippingClient;
import com.lemoo.chat_ai_mcp_server.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShippingService {
    private final ShippingClient shippingClient;

    @Tool(
            name = "getUserAddresses",
            description = "Retrieves a list of all shipping addresses associated with a user by calling the shipping service API. Requires the user's unique identifier as input."
    )
    public ApiResponse<?> getAllShippingAddress(String userId) {
        return ApiResponse.success(shippingClient.getAllShippingAddress(userId));
    }


}
