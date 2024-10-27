/*
 *  AccountResponse
 *  @author: Minhhieuano
 *  @created 10/27/2024 10:51 AM
 * */

package com.lemoo.auth.dto.response;

import com.lemoo.auth.common.enums.Gender;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
	private String id;
	private String avatar;
	private String email;
	private String phone;
	private String displayName;
	private LocalDate dateOfBirth;
	private String address;
	private Gender gender;
}
