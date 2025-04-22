/*
 *  McpServerConfig
 *  @author: pc
 *  @created 4/17/2025 11:49 PM
 * */


package com.lemoo.chat_ai_mcp_server.config;

import com.lemoo.chat_ai_mcp_server.service.OrderService;
import com.lemoo.chat_ai_mcp_server.service.ProductSearchService;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class McpServerConfig {

    @Bean
    public ToolCallbackProvider myTools(
            ProductSearchService productSearchService,
            OrderService orderService
    ) {
        return MethodToolCallbackProvider.builder().toolObjects(productSearchService, orderService).build();
    }


}
