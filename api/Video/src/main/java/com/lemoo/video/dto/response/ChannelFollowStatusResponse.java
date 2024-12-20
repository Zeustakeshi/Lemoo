/*
 *  ChannelFollowStatusResponse
 *  @author: Minhhieuano
 *  @created 12/20/2024 12:04 PM
 * */

package com.lemoo.video.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelFollowStatusResponse extends ChannelBasicInfoResponse {

	@JsonProperty("isFollowed")
	private boolean isFollowed;
}
