/*
 *  MessageController
 *  @author: Minhhieuano
 *  @created 2/8/2025 9:58 AM
 * */


package com.lemoo.chat.controller;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.MessageRequest;
import com.lemoo.chat.dto.response.ApiResponse;
import com.lemoo.chat.dto.response.MessageResponse;
import com.lemoo.chat.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms/{roomId}/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;


    @PostMapping
    public ApiResponse<MessageResponse> sendMessage(
            @PathVariable("roomId") String roomId,
            @RequestBody @Valid MessageRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(messageService.createMessage(request, roomId, account));
    }
}
