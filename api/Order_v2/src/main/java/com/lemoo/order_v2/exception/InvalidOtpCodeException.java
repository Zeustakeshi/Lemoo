/*
 *  InvalidOtpCodeException
 *  @author: Minhhieuano
 *  @created 10/18/2024 4:29 PM
 * */

package com.lemoo.order_v2.exception;

public class InvalidOtpCodeException extends RuntimeException {

    public InvalidOtpCodeException(String message) {
        super(message);
    }
}
