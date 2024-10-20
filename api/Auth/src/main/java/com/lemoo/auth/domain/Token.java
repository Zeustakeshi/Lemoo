/*
 *  Token
 *  @author: Minhhieuano
 *  @created 10/18/2024 7:51 PM
 * */

package com.lemoo.auth.domain;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.auth.common.enums.TokenType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Token {
	@Builder.Default
	private String id = NanoIdUtils.randomNanoId();

	private String value;
	private TokenType type;
	private Long expiresIn;
}
