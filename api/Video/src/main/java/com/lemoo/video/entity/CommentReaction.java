/*
 *  Video
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:49 PM
 * */

package com.lemoo.video.entity;

import com.lemoo.video.common.enums.ReactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
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
@CompoundIndex(def = "{commentId: 1, userId: 1}")
public class CommentReaction extends BaseEntity {

	@Indexed
	private String commentId;

	private ReactionType type;

	private String userId;
}
