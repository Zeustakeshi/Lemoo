/*
 *  NotfoundException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:06 PM
 * */

package com.vibio.gateway.exception;

import org.springframework.http.HttpStatus;

public class NotfoundException extends ApiException {
	public NotfoundException(String message) {
		super(HttpStatus.NOT_FOUND, message);
	}
}
