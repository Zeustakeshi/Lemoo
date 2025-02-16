/*
 *  MessageController
 *  @author: Minhhieuano
 *  @created 2/8/2025 9:58 AM
 * */


package com.lemoo.chat.controller;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.response.ApiResponse;
import com.lemoo.chat.dto.response.MessageResponse;
import com.lemoo.chat.dto.response.PageableResponse;
import com.lemoo.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms/{roomId}/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @GetMapping
    public ApiResponse<PageableResponse<MessageResponse>> getMessages(
            @PathVariable("roomId") String roomId,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(messageService.getMessage(roomId, page, limit, account));
    }

}
