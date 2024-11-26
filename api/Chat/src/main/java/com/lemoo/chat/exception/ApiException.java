/*
 *  ApiException
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:25 AM
 * */

package com.lemoo.chat.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@Data
@EqualsAndHashCode(callSuper = true)
public abstract class ApiException extends RuntimeException {
    protected String message;
    protected HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
