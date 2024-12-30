/*
 *  ReactionResponse
 *  @author: Minhhieuano
 *  @created 12/18/2024 3:39 PM
 * */

package com.lemoo.video.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReactionResponse {

	@Builder.Default
	private Long like = 0L;

	@Builder.Default
	private Long dislike = 0L;

	@Builder.Default
	@JsonProperty("isLiked")
	private boolean isLiked = false;

	@Builder.Default
	@JsonProperty("isDisliked")
	private boolean isDisliked = false;
}
