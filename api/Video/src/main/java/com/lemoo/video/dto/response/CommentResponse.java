/*
 *  CommentResponse
 *  @author: Minhhieuano
 *  @created 12/18/2024 4:36 PM
 * */

package com.lemoo.video.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
	private String id;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	@JsonProperty("isEdited")
	private boolean isEdited;

	private Long replyCount;

	private ReactionResponse reaction;
}
