/*
 *  SocketExceptionHandler
 *  @author: Minhhieuano
 *  @created 2/11/2025 6:09 PM
 * */


package com.lemoo.socket.exception;


import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Component;

@Component
public class SocketExceptionHandler {
    @MessageExceptionHandler(NotAuthenticatedException.class)
    @SendToUser("/topic/exceptions/notAuthenticatedException")
    public String handleNotAuthenticatedException(NotAuthenticatedException ex) {
        return ex.getMessage();
    }
}