/*
 *  VerifyUserInternalRequest
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:01 PM
 * */

package com.lemoo.chat.dto.request;

import java.util.Set;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BatchFetchUserInfoRequest {
	private Set<String> users;
}
