/*
 *  SocketService
 *  @author: Minhhieuano
 *  @created 2/12/2025 1:12 AM
 * */

package com.lemoo.chat.service;

import com.lemoo.chat.common.enums.MessageStatus;
import com.lemoo.chat.entity.Message;

public interface SocketService {
    void sendRealtimeMessage(Message message);

    void updateMessageStatus(String messageId, String roomId, MessageStatus status, String updateBy);
}

