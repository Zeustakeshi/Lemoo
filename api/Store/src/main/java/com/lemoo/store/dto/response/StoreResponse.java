/*
 *  StoreResponse
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:31 PM
 * */

package com.lemoo.store.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreResponse {
	private String id;
	private String name;
	private String avatar;
	private String email;
	private String phone;
}
