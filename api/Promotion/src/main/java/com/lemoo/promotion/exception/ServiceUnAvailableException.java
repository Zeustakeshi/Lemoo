/*
 *  NotfoundException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:06 PM
 * */

package com.lemoo.promotion.exception;

import org.springframework.http.HttpStatus;

public class ServiceUnAvailableException extends ApiException {
    public ServiceUnAvailableException(String message) {
        super(HttpStatus.SERVICE_UNAVAILABLE, message);
    }
}
