/*
 *  AccountMfa
 *  @author: Minhhieuano
 *  @created 10/18/2024 9:46 PM
 * */

package com.lemoo.auth.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class AccountMfa extends AccountOtpInformation {
	String accountId;
}
