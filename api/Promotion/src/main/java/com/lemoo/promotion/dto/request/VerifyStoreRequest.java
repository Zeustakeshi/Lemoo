/*
 *  VerifyStoreRequest
 *  @author: Minhhieuano
 *  @created 12/27/2024 10:00 PM
 * */

package com.lemoo.promotion.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyStoreRequest {
	private String accountId;
	private String storeId;
}
