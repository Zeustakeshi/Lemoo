/*
 *  introspectTokenRequest
 *  @author: Minhhieuano
 *  @created 9/14/2024 12:53 AM
 * */

package com.vibio.gateway.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IntrospectTokenRequest {
	@NotNull @NotBlank
	private String token;
}
