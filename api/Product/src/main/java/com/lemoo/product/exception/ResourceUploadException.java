/*
 *  RousourceUploadException
 *  @author: Minhhieuano
 *  @created 12/15/2024 10:18 PM
 * */

package com.lemoo.product.exception;

import org.springframework.http.HttpStatus;

public class ResourceUploadException extends ApiException {
	public ResourceUploadException(String message) {
		super(HttpStatus.INTERNAL_SERVER_ERROR, message);
	}
}
