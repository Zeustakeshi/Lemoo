/*
 *  NotfoundException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:06 PM
 * */

package com.vibio.gateway.exception;

import org.springframework.http.HttpStatus;

public class TooManyRequestsException extends ApiException {
	public TooManyRequestsException(String message) {
		super(HttpStatus.TOO_MANY_REQUESTS, message);
	}
}
