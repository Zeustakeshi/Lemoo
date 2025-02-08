/*
 *  MessageMapper
 *  @author: Minhhieuano
 *  @created 2/8/2025 10:17 AM
 * */


package com.lemoo.chat.mapper;

import com.lemoo.chat.dto.response.MessageResponse;
import com.lemoo.chat.dto.response.UserResponse;
import com.lemoo.chat.entity.Message;
import com.lemoo.chat.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
public abstract class MessageMapper {

    @Autowired
    private UserService userService;

    @Mapping(target = "sender", ignore = true)
    public abstract MessageResponse toMessageResponse(Message message);

    public MessageResponse toMessageResponse(Message message, String senderId) {
        UserResponse sender = userService.getUserInfo(senderId)
                .orElse(UserResponse.builder().name("Unknown user").build());
        MessageResponse messageResponse = toMessageResponse(message);
        messageResponse.setSender(sender);
        return messageResponse;
    }

}
