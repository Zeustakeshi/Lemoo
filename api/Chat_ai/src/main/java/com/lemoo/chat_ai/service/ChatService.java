/*
 *  ChatService
 *  @author: pc
 *  @created 4/18/2025 9:06 AM
 * */


package com.lemoo.chat_ai.service;

import io.modelcontextprotocol.client.McpSyncClient;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.ai.mcp.SyncMcpToolCallbackProvider;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;

@Service
public class ChatService {
    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder chatClientBuilder, List<McpSyncClient> mcpSyncClients) {
        chatClient = chatClientBuilder
                .defaultTools(new SyncMcpToolCallbackProvider(mcpSyncClients))
                .defaultAdvisors(new MessageChatMemoryAdvisor(new InMemoryChatMemory()))
                .build();
    }

    public Flux<String> chat(String query) {
        return chatClient.prompt()
                .user(query)
                .stream()
                .content();
    }

    public String chatWithoutStream(String query) {
        return chatClient.prompt()
                .user(query)
                .call()
                .content();
    }
}
