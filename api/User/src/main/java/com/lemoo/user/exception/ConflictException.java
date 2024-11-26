/*
 *  NotfoundException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:06 PM
 * */

package com.lemoo.user.exception;

import org.springframework.http.HttpStatus;

public class ConflictException extends ApiException {
	public ConflictException(String message) {
		super(HttpStatus.CONFLICT, message);
	}
}
