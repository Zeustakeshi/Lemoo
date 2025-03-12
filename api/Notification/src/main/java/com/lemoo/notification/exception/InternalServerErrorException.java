/*
 *  NotfoundException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:06 PM
 * */

package com.lemoo.notification.exception;

import org.springframework.http.HttpStatus;

public class InternalServerErrorException extends ApiException {
    public InternalServerErrorException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}
