/*
 *  ChatService
 *  @author: pc
 *  @created 4/18/2025 9:06 AM
 * */


package com.lemoo.chat_ai.service.impl;

import com.lemoo.chat_ai.dto.common.AuthenticatedAccount;
import com.lemoo.chat_ai.dto.request.AskAiRequest;
import com.lemoo.chat_ai.dto.response.MessageResponse;
import com.lemoo.chat_ai.service.ChatMemoryService;
import com.lemoo.chat_ai.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatClient chatClient;
    private final ChatMemoryService chatMemoryService;

    @Override
    public String askLemooAi(AuthenticatedAccount account, AskAiRequest request) {
        String conversationId = chatMemoryService.getConversationId(account.getUserId());
        String response = chatClient
                .prompt("""
                        This is the user's information:
                        userId: {},
                        accountId: {},
                        email: {}
                        Use this information strictly for context to personalize the response. 
                        Do NOT include or expose userId, accountId, or email in the response. 
                        Do NOT use any information provided in the user's question unless explicitly instructed. 
                        Respond only based on the user's message and the provided context.
                        """.formatted(account.getUserId(), account.getId(), account.getEmail()))
                .user("User question: " + request.getMessage())
                .messages(chatMemoryService.getAllMessages(conversationId))
                .call().content();

        saveMemory(conversationId,
                new UserMessage(request.getMessage()),
                new AssistantMessage(response)
        );
        return response;
    }

    @Override
    public List<MessageResponse> getAllMessage(AuthenticatedAccount account) {
        String conversationId = chatMemoryService.getConversationId(account.getUserId());
        List<Message> messages = chatMemoryService.getAllMessages(conversationId);
        return messages.stream().map(message -> MessageResponse.builder()
                .content(message.getText())
                .type(message.getMessageType())
                .build()).toList();
    }

    @Async
    protected void saveMemory(String conversationId, UserMessage userMessage, AssistantMessage assistantMessage) {

        chatMemoryService.addMessage(conversationId, userMessage);
        chatMemoryService.addMessage(conversationId, assistantMessage);
    }

}
