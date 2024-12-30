/*
 *  AccountMapper
 *  @author: Minhhieuano
 *  @created 10/18/2024 4:36 PM
 * */

package com.lemoo.auth.mapper;

import com.lemoo.auth.domain.AccountConfirmation;
import com.lemoo.auth.dto.request.CreateAccountRequest;
import com.lemoo.auth.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {

	@Mapping(target = "otpCode", ignore = true)
	AccountConfirmation createAccountRequestToAccountConfirmation(CreateAccountRequest accountRequest);

	Account accountConfirmationToAccount(AccountConfirmation accountConfirmation);
}
