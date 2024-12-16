/*
 *  Video
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:49 PM
 * */


package com.lemoo.video.entity;


import com.lemoo.video.common.enums.ReactionType;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@CompoundIndex(def = "{commentId: 1, userId: 1}")
public class VideoCommentReaction extends BaseEntity {

    @Indexed
    private String commentId;

    private ReactionType type;

    private String userId;

    
}
