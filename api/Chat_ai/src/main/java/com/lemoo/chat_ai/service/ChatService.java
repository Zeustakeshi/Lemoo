/*
 *  ChatService
 *  @author: pc
 *  @created 4/19/2025 10:41 PM
 * */

package com.lemoo.chat_ai.service;

import com.lemoo.chat_ai.dto.common.AuthenticatedAccount;
import com.lemoo.chat_ai.dto.request.AskAiRequest;
import com.lemoo.chat_ai.dto.response.MessageResponse;

import java.util.List;

public interface ChatService {
    String askLemooAi(AuthenticatedAccount account, AskAiRequest request);

    List<MessageResponse> getAllMessage(AuthenticatedAccount account);
}
