/*
 *  ApiResponse
 *  @author: Minhhieuano
 *  @created 9/8/2024 9:00 PM
 * */

package com.vibio.gateway.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
	private boolean isSuccess;
	private T data;
	private Object errors;
	private LocalDateTime timestamp;

	public static <T> ApiResponse<T> success(T data) {
		return ApiResponse.<T>builder()
				.data(data)
				.isSuccess(true)
				.timestamp(LocalDateTime.now())
				.build();
	}

	public static <T> ApiResponse<T> error(Object errors) {
		return ApiResponse.<T>builder()
				.isSuccess(false)
				.errors(errors)
				.timestamp(LocalDateTime.now())
				.build();
	}
}
