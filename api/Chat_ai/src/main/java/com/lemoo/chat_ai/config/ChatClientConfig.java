/*
 *  ChatClientConfig
 *  @author: pc
 *  @created 4/18/2025 1:36 AM
 * */


package com.lemoo.chat_ai.config;

import io.modelcontextprotocol.client.McpSyncClient;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.mcp.SyncMcpToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ChatClientConfig {

    @Bean
    public ChatClient chatClient(ChatClient.Builder chatClientBuilder, List<McpSyncClient> mcpSyncClients) {
        for (var client : mcpSyncClients) {
            System.out.println("client info:" + client.getClientInfo());
            System.out.println("tools" + client.listTools());
        }
        return chatClientBuilder
                .defaultTools(new SyncMcpToolCallbackProvider(mcpSyncClients))
                .defaultSystem("""
                        You are a virtual shopping assistant for users on the Lemoo e-commerce platform.
                        Your role is to enhance the user's shopping experience by leveraging available tools to interact with the system.
                        Your responsibilities include: searching for orders, creating shopping plans, reviewing user orders, and managing promotions for users.
                        If a user asks questions unrelated to these tasks, politely decline to assist, keeping your focus on shopping-related functionalities.
                        """)
                .build();
    }
}
