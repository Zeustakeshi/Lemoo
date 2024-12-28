/*
 *  VerifyStoreRequest
 *  @author: Minhhieuano
 *  @created 12/26/2024 10:07 AM
 * */

package com.lemoo.store.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyStoreRequest {
	private String accountId;
	private String storeId;
}
