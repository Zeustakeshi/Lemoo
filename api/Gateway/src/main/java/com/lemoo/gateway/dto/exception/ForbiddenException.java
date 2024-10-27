/*
 *  NotfoundException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:06 PM
 * */

package com.vibio.gateway.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends ApiException {
	public ForbiddenException(String message) {
		super(HttpStatus.FORBIDDEN, message);
	}
}
