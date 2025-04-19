/*
 *  ChatController
 *  @author: pc
 *  @created 4/18/2025 1:38 AM
 * */


package com.lemoo.chat_ai.controller;

import com.lemoo.chat_ai.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final ChatService chatService;

    @GetMapping
    public String chatWithoutStream(@RequestParam("message") String message) {
        return chatService.chatWithoutStream(message);
    }
}
