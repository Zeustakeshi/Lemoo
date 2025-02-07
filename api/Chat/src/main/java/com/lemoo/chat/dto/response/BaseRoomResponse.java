/*
 *  BaseRoomResponse
 *  @author: Minhhieuano
 *  @created 2/8/2025 1:05 AM
 * */


package com.lemoo.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lemoo.chat.common.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseRoomResponse {
    private String id;
    private String name;
    private String avatar;
    private RoomType type;

    @JsonProperty("isSA")
    private boolean isSA;
}
