/*
 *  NotfoundException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:06 PM
 * */

package com.lemoo.gateway.dto.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends ApiException {
	public UnauthorizedException(String message) {
		super(HttpStatus.UNAUTHORIZED, message);
	}
}
