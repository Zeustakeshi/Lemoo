/*
 *  ChannelFollower
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:45 PM
 * */


package com.lemoo.video.entity;

import lombok.*;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@CompoundIndex(unique = true, def = "{channelId: 1, userId: 1}")
public class ChannelFollower extends BaseEntity {
    private String channelId;
    private String userId;
}
