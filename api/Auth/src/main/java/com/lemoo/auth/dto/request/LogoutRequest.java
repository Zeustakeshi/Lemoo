/*
 *  LogoutRequest
 *  @author: Minhhieuano
 *  @created 10/19/2024 12:31 AM
 * */

package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LogoutRequest {
	@NotEmpty
	private String token;
}
