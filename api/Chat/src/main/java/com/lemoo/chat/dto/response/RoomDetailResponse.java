/*
 *  RoomDetailResponse
 *  @author: Minhhieuano
 *  @created 2/8/2025 12:50 AM
 * */


package com.lemoo.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDetailResponse extends BaseRoomResponse {
    private Integer totalMembers;
}
