/*
 *  GlobalExceptionHandler
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:29 AM
 * */

package com.lemoo.order_v2.exception;

import com.lemoo.order_v2.dto.response.ApiResponse;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<ApiResponse<?>> handleApiException(ApiException exception) {
		ApiResponse<?> response = ApiResponse.error(exception.getMessage());
		log.info(exception.getMessage());
		return new ResponseEntity<>(response, exception.getStatus());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<?>> handleException(Exception exception) {
		ApiResponse<?> response = ApiResponse.error(exception.getMessage());
		log.error(exception.toString());
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(MissingRequestHeaderException.class)
	public ResponseEntity<ApiResponse<?>> handleMissingRequestHeaderException(MissingRequestHeaderException exception) {
		String message = "Missing request header: " + exception.getMessage();

		ApiResponse<?> response = ApiResponse.error(message);
		log.error(message);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ResourceUploadException.class)
	public ResponseEntity<ApiResponse<?>> handleResourceUploadException(ResourceUploadException exception) {
		String message = "Upload file error: " + exception.getMessage();

		ApiResponse<?> response = ApiResponse.error(message);
		log.error(message);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<?>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
		Map<String, Object> errors = new HashMap<>();
		log.info("Validation failed {}", ex.getMessage());
		for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
			errors.put(fieldError.getField(), fieldError.getDefaultMessage());
		}
		return new ResponseEntity<>(ApiResponse.error(errors), ex.getStatusCode());
	}
}
