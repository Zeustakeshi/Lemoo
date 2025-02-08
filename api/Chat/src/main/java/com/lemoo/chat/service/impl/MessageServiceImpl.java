/*
 *  MessageServiceImpl
 *  @author: Minhhieuano
 *  @created 2/8/2025 10:07 AM
 * */


package com.lemoo.chat.service.impl;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.MessageRequest;
import com.lemoo.chat.dto.response.MessageResponse;
import com.lemoo.chat.entity.Message;
import com.lemoo.chat.entity.Room;
import com.lemoo.chat.mapper.MessageMapper;
import com.lemoo.chat.repository.MessageRepository;
import com.lemoo.chat.service.MessageService;
import com.lemoo.chat.service.RoomService;
import com.lemoo.chat.service.RoomValidatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final RoomValidatorService roomValidatorService;
    private final RoomService roomService;
    private final MessageMapper messageMapper;

    @Override
    public MessageResponse createMessage(MessageRequest request, String roomId, AuthenticatedAccount account) {
        Room room = roomService.findRoomById(roomId);
        // check member permission
        roomValidatorService.validateRoomAccessPermission(room, account.getUserId());
        
        Message message = messageRepository.save(Message
                .builder()
                .roomId(roomId)
                .senderId(account.getUserId())
                .text(request.getText())
                .build()
        );
        return messageMapper.toMessageResponse(message);
    }
}
