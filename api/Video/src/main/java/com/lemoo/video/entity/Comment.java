/*
 *  Video
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:49 PM
 * */

package com.lemoo.video.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
@CompoundIndex(def = "{videoId: 1, userId: 1}")
public class Comment extends BaseEntity {

	@Indexed
	private String videoId;

	private String userId;
	private String content;

	@Indexed
	private String parentId;

	@JsonProperty("isEdited")
	private boolean isEdited;

	@Builder.Default
	private Long replyCount = 0L;
}
