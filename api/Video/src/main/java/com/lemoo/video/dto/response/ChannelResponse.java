/*
 *  ChannelResponse
 *  @author: Minhhieuano
 *  @created 12/17/2024 12:12 AM
 * */


package com.lemoo.video.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChannelResponse {
    private String id;
    private String name;
    private String avatar;
    private String background;
    private String description;

    @Builder.Default
    private Long following = 0L;

    @Builder.Default
    private Long follower = 0L;

    @JsonProperty("isFollowed")
    @Builder.Default
    private boolean isFollowed = false;

}
