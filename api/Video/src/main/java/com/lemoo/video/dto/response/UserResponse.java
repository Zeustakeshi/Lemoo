/*
 *  UserClientResponse
 *  @author: Minhhieuano
 *  @created 12/23/2024 11:16 PM
 * */

package com.lemoo.video.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
	private String id;
	private String username;
	private String avatar;
}
