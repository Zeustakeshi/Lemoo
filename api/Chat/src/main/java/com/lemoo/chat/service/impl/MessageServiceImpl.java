/*
 *  MessageServiceImpl
 *  @author: Minhhieuano
 *  @created 2/8/2025 10:07 AM
 * */


package com.lemoo.chat.service.impl;

import com.lemoo.chat.common.enums.MessageStatus;
import com.lemoo.chat.common.enums.MessageType;
import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.common.VoucherTransaction;
import com.lemoo.chat.dto.response.MessageResponse;
import com.lemoo.chat.dto.response.PageableResponse;
import com.lemoo.chat.entity.Message;
import com.lemoo.chat.entity.Room;
import com.lemoo.chat.mapper.MessageMapper;
import com.lemoo.chat.mapper.PageMapper;
import com.lemoo.chat.repository.MessageRepository;
import com.lemoo.chat.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final RoomValidatorService roomValidatorService;
    private final RoomService roomService;
    private final MessageMapper messageMapper;
    private final PageMapper pageMapper;
    private final NotificationService notificationService;
    private final SocketService socketService;

    @Override
    public void createMessage(String senderId, String roomId, String text) {
        Room room = roomService.findRoomById(roomId);
        roomValidatorService.validateRoomAccessPermission(room, senderId);

        Message message = messageRepository.save(Message
                .builder()
                .roomId(roomId)
                .status(MessageStatus.SENT)
                .senderId(senderId)
                .text(text)
                .build()
        );

        notificationService.sendNewMessageNotification(text, roomId, senderId);
        socketService.sendRealtimeMessage(message);

    }

    @Override
    public void createVoucherMessage(String senderId, String targetId, VoucherTransaction voucherTransaction) {
        String roomId = voucherTransaction.getRoomId();
        Room room = roomService.findRoomById(roomId);
        roomValidatorService.validateRoomAccessPermission(room, senderId);
        Message message = messageRepository.save(Message
                .builder()
                .roomId(roomId)
                .status(MessageStatus.SENT)
                .type(MessageType.VOUCHER)
                .senderId(senderId)
                .text("New share voucher")
                .payload(Map.of(
                        "voucherId", voucherTransaction.getVoucherId(),
                        "transactionId", voucherTransaction.getTransactionId()
                ))
                .build()
        );
        notificationService.sendNewMessageNotification(message.getText(), roomId, senderId);
        socketService.sendRealtimeMessage(message);
    }

    @Override
    public PageableResponse<MessageResponse> getMessage(String roomId, int page, int limit, AuthenticatedAccount account) {
        Room room = roomService.findRoomById(roomId);
        roomValidatorService.validateRoomAccessPermission(room, account.getUserId());

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Message> messages = messageRepository.findAllByRoomId(roomId, request);


        Page<MessageResponse> messageResponses = messages.map(message ->
                CompletableFuture.supplyAsync(() -> {
                    boolean isSelf = message.getSenderId().equals(account.getUserId());
                    if (isSelf) return messageMapper.toMessageResponse(message);
                    else return messageMapper.toMessageResponse(message, message.getSenderId());
                })
        ).map(CompletableFuture::join);

        return pageMapper.toPageableResponse(messageResponses);
    }
}
