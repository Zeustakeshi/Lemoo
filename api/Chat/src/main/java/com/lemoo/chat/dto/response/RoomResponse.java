/*
 *  RoomResponse
 *  @author: Minhhieuano
 *  @created 2/7/2025 5:23 PM
 * */

package com.lemoo.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lemoo.chat.common.enums.RoomType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomResponse {
	private String id;
	private String name;
	private String avatar;
	private RoomType type;

	@JsonProperty("isSA")
	private boolean isSA;
}
