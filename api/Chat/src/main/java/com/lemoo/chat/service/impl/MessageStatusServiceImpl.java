/*
 *  MessageStatusServiceImpl
 *  @author: Minhhieuano
 *  @created 2/11/2025 11:30 PM
 * */


package com.lemoo.chat.service.impl;

import com.lemoo.chat.common.enums.MessageStatus;
import com.lemoo.chat.entity.Message;
import com.lemoo.chat.exception.NotfoundException;
import com.lemoo.chat.repository.MessageRepository;
import com.lemoo.chat.service.MessageStatusService;
import com.lemoo.chat.service.SocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageStatusServiceImpl implements MessageStatusService {

    private final MessageRepository messageRepository;
    private final SocketService socketService;

    @Override
    public void updateMessageStatus(String messageId, MessageStatus status, String updateBy) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new NotfoundException("Message " + messageId + " not found."));
        message.setStatus(status);

        if (status == MessageStatus.RECEIVED) {
            message.getViewers().add(updateBy);
        }

        messageRepository.save(message);
        
        socketService.updateMessageStatus(messageId, message.getRoomId(), status, updateBy);
    }

}
