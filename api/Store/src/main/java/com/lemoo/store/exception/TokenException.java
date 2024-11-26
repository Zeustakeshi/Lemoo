/*
 *  InvalidTokenException
 *  @author: Minhhieuano
 *  @created 10/19/2024 12:07 AM
 * */

package com.lemoo.store.exception;

public class TokenException extends RuntimeException {
    public TokenException(String message) {
        super(message);
    }
}
