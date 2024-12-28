/*
 *  IntrospectTokenRequest
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:14 PM
 * */

package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class IntrospectTokenRequest {

	@NotEmpty
	private String token;
}
