/*
 *  AuthChannelInterceptor
 *  @author: Minhhieuano
 *  @created 2/11/2025 12:23 AM
 * */


package com.lemoo.socket.config;

import com.lemoo.socket.dto.common.AuthenticatedAccount;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class AuthChannelInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");
            if (authHeader == null) return message;
            String token = authHeader.substring(7);
            AuthenticatedAccount account = callAuthServer(token);
            accessor.setUser(new UsernamePasswordAuthenticationToken(account, null, null));
        }
        return message;
    }

    private AuthenticatedAccount callAuthServer(String token) {
        return AuthenticatedAccount.builder()
                .email("example.user@gmail.com")
                .userId("user-id-1")
                .id("id-1")
                .build();
    }
}
