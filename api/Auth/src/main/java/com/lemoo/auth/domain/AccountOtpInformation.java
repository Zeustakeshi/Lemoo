/*
 *  AccountOtpInformation
 *  @author: Minhhieuano
 *  @created 10/18/2024 4:49 PM
 * */

package com.lemoo.auth.domain;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
public abstract class AccountOtpInformation {

	@Builder.Default
	@Setter(AccessLevel.PRIVATE)
	private String code = NanoIdUtils.randomNanoId();

	private String otpCode;

	private String email;

	@Builder.Default
	private Integer validationCount = 0;
}
