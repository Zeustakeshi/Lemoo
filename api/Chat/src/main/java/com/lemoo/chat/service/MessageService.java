/*
 *  MessageService
 *  @author: Minhhieuano
 *  @created 2/8/2025 10:07 AM
 * */

package com.lemoo.chat.service;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.MessageRequest;
import com.lemoo.chat.dto.response.MessageResponse;
import com.lemoo.chat.dto.response.PageableResponse;

public interface MessageService {
    MessageResponse createMessage(MessageRequest request, String roomId, AuthenticatedAccount account);

    PageableResponse<MessageResponse> getMessage(
            String roomId,
            int page,
            int limit,
            AuthenticatedAccount account
    );

}
