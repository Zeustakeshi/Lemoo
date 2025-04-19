/*
 *  ChatClientConfig
 *  @author: pc
 *  @created 4/18/2025 1:36 AM
 * */


package com.lemoo.chat_ai.config;

import io.modelcontextprotocol.client.McpSyncClient;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.ai.mcp.SyncMcpToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ChatClientConfig {

    @Bean
    public ChatClient chatClient(ChatClient.Builder chatClientBuilder, List<McpSyncClient> mcpSyncClients) {
        return chatClientBuilder
                .defaultTools(new SyncMcpToolCallbackProvider(mcpSyncClients))
                .defaultAdvisors(new MessageChatMemoryAdvisor(new InMemoryChatMemory()))
                .build();
    }
}
