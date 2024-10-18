/*
 *  LoginRequest
 *  @author: Minhhieuano
 *  @created 10/18/2024 9:36 PM
 * */

package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginRequest {

	@NotEmpty
	private String accountName;

	@NotEmpty
	private String password;
}
