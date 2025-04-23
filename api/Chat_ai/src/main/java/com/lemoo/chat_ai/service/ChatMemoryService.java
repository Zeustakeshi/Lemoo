/*
 *  ChatMemonyService
 *  @author: pc
 *  @created 4/19/2025 11:20 PM
 * */

package com.lemoo.chat_ai.service;

import org.springframework.ai.chat.messages.Message;

import java.util.List;

public interface ChatMemoryService {

    boolean isExistedChatSession(String conversationId);

    void addMessage(String conversationId, Message message);

    List<Message> getAllMessages(String conversationId);

    String getConversationId(String userId);
}
