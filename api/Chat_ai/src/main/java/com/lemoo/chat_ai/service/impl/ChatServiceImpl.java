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
import org.springframework.ai.chat.messages.SystemMessage;
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

        if (!chatMemoryService.isExistedChatSession(conversationId)) {
            chatMemoryService.addMessage(conversationId,
                    new SystemMessage("userId: " + account.getUserId() + " userEmail: " + account.getEmail())
            );
        }

        String response = chatClient
                .prompt()
                .user(
                        "userId: " + account.getUserId() + " email" + account.getEmail() + " User message" +
                                request.getMessage())
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
