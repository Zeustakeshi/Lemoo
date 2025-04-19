/*
 *  TestController
 *  @author: pc
 *  @created 4/18/2025 1:18 AM
 * */


package com.lemoo.chat_ai_mcp_server;

import com.lemoo.chat_ai_mcp_server.client.SearchClient;
import com.lemoo.chat_ai_mcp_server.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
    private final SearchClient searchClient;

    @GetMapping
    public ApiResponse<?> searchProduct() {
        return ApiResponse.success(searchClient.searchProducts("Bàn phím"));
    }
}
