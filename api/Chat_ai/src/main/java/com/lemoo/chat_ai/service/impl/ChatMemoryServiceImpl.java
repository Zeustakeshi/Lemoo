/*
 *  ChatMemoryServiceImpl
 *  @author: pc
 *  @created 4/19/2025 11:23 PM
 * */


package com.lemoo.chat_ai.service.impl;

import com.lemoo.chat_ai.service.ChatMemoryService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RList;
import org.redisson.api.RedissonClient;
import org.springframework.ai.chat.messages.Message;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMemoryServiceImpl implements ChatMemoryService {
    private final RedissonClient redisson;

    @Override
    public void addMessage(String conversationId, Message message) {
        RList<Message> rList = redisson.getList(conversationId);
        if (rList.size() > 80) rList.remove(0);
        rList.add(message);
        rList.expire(Duration.ofMinutes(30));
    }

    @Override
    public List<Message> getAllMessages(String conversationId) {
        RList<Message> rList = redisson.getList(conversationId);
        return rList.readAll();
    }

    @Override
    public String getConversationId(String userId) {
        return "ai:chat:" + userId + ":conversations";
    }
}
