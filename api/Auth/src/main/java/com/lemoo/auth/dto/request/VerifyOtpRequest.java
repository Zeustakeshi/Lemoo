/*
 *  VerifyOtpRequest
 *  @author: Minhhieuano
 *  @created 10/18/2024 8:19 PM
 * */

package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VerifyOtpRequest {
	@NotEmpty
	private String code;

	@NotEmpty
	@Size(min = 6, max = 6)
	private String otp;
}
