/*
 *  MessageStatusService
 *  @author: Minhhieuano
 *  @created 2/11/2025 11:30 PM
 * */

package com.lemoo.chat.service;

import com.lemoo.chat.common.enums.MessageStatus;

public interface MessageStatusService {
    void updateMessageStatus(String messageId, MessageStatus status, String updateBy);
}
