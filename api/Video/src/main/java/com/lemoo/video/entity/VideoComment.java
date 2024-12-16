/*
 *  Video
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:49 PM
 * */


package com.lemoo.video.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
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
@CompoundIndex(def = "{videoId: 1, userId: 1}")
public class VideoComment extends BaseEntity {

    @Indexed
    private String videoId;

    private String userId;
    private String content;

    @Indexed
    private String parentId;

    @JsonProperty("isEdited")
    private boolean isEdited;

}
