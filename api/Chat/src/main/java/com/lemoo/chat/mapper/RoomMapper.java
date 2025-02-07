/*
 *  RoomMapper
 *  @author: Minhhieuano
 *  @created 2/7/2025 5:47 PM
 * */

package com.lemoo.chat.mapper;

import com.lemoo.chat.common.enums.RoomType;
import com.lemoo.chat.dto.response.BaseRoomResponse;
import com.lemoo.chat.dto.response.RoomDetailResponse;
import com.lemoo.chat.dto.response.RoomResponse;
import com.lemoo.chat.entity.Room;
import com.lemoo.chat.entity.SingleRoom;
import com.lemoo.chat.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.Set;

@Mapper(componentModel = "spring")
public abstract class RoomMapper {

    @Autowired
    protected UserService userService;


    public RoomDetailResponse toRoomDetailResponse(Room room, String currentUserId) {
        RoomDetailResponse response = RoomDetailResponse
                .builder()
                .id(room.getId())
                .type(room.getType())
                .totalMembers(room.getMembers().size())
                .build();

        if (room.getType().equals(RoomType.SINGLE)) {
            handleSingleRoom(response, (SingleRoom) room, currentUserId);
        }

        return response;
    }

    @Named("toRoomResponse")
    public RoomResponse toRoomResponse(Room room, String currentUserId) {
        RoomResponse response = RoomResponse.builder().id(room.getId()).type(room.getType()).build();
        if (room.getType().equals(RoomType.SINGLE)) {
            handleSingleRoom(response, (SingleRoom) room, currentUserId);
        }
        return response;
    }

    private void handleSingleRoom(BaseRoomResponse response, SingleRoom room, String currentUserId) {
        response.setSA(room.isSA());
        getOtherUserId(room.getMembers(), currentUserId)
                .flatMap(userService::getUserInfo)
                .ifPresentOrElse(
                        user -> {
                            response.setAvatar(user.getAvatar());
                            response.setName(user.getName());
                        },
                        () -> response.setName("Unknown")
                );
    }

    private Optional<String> getOtherUserId(Set<String> members, String currentUserId) {
        return members.stream()
                .filter(memberId -> !memberId.equals(currentUserId))
                .findFirst();
    }

}
