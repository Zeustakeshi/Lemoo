/*
 *  AuthChannelInterceptor
 *  @author: Minhhieuano
 *  @created 2/11/2025 12:23 AM
 * */


package com.lemoo.socket.config;

import com.lemoo.socket.dto.common.AuthenticatedAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthChannelInterceptor implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");
            if (authHeader == null) return message;
            String token = authHeader.substring(7);
            AuthenticatedAccount account = decodeJwt(token);
            accessor.setUser(new UsernamePasswordAuthenticationToken(account, null, null));
        }
        return message;
    }

    private AuthenticatedAccount decodeJwt(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        return AuthenticatedAccount.builder()
                .id(jwt.getSubject())
                .email(jwt.getClaim("email"))
                .userId(jwt.getClaim("user_id"))
                .build();
    }
}
