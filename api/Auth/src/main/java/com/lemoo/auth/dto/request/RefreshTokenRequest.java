/*
 *  RefreshTokenRequest
 *  @author: Minhhieuano
 *  @created 10/18/2024 10:17 PM
 * */

package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RefreshTokenRequest {
	@NotEmpty
	private String refreshToken;
}
