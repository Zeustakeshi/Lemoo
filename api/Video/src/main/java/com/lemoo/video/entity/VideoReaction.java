/*
 *  Video
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:49 PM
 * */


package com.lemoo.video.entity;


import com.lemoo.video.common.enums.ReactionType;
import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@CompoundIndex(unique = true, def = "{videoId: 1, userId: 1}")
public class VideoReaction extends BaseEntity {
    private String videoId;
    private String userId;
    private ReactionType type;
}
