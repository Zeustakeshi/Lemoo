/*
 *  Channel
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:43 PM
 * */

package com.lemoo.video.entity;

import com.lemoo.video.common.enums.ChannelStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
public class Channel extends BaseEntity {
    @Indexed(unique = true)
    private String name;

    private String avatar;

    @Indexed(unique = true)
    private String userId;

    private String storeId;

    private String background;
    private String description;
    private ChannelStatus status;

    @Builder.Default
    private Long follower = 0L;

    @Builder.Default
    private Long following = 0L;
}
