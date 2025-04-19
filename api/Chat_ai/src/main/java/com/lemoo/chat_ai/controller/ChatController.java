/*
 *  ChatController
 *  @author: pc
 *  @created 4/18/2025 1:38 AM
 * */


package com.lemoo.chat_ai.controller;

import com.lemoo.chat_ai.dto.common.AuthenticatedAccount;
import com.lemoo.chat_ai.dto.request.AskAiRequest;
import com.lemoo.chat_ai.dto.response.ApiResponse;
import com.lemoo.chat_ai.dto.response.MessageResponse;
import com.lemoo.chat_ai.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final ChatService chatService;

    @PostMapping("ask")
    public ApiResponse<String> askLemooAi(
            @RequestBody @Valid AskAiRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(chatService.askLemooAi(account, request));
    }

    @GetMapping("messages")
    public ApiResponse<List<MessageResponse>> getAllMessages(
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(chatService.getAllMessage(account));
    }
}
