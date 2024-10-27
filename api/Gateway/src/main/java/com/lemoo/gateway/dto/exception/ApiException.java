/*
 *  ApiException
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:04 PM
 * */

package com.vibio.gateway.exception;

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
