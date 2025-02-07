/*
 *  RoomMapper
 *  @author: Minhhieuano
 *  @created 2/7/2025 5:47 PM
 * */

package com.lemoo.chat.mapper;

import com.lemoo.chat.client.UserClient;
import com.lemoo.chat.common.enums.RoomType;
import com.lemoo.chat.dto.response.RoomResponse;
import com.lemoo.chat.entity.Room;
import com.lemoo.chat.entity.SingleRoom;
import com.lemoo.chat.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public abstract class RoomMapper {

    protected final UserClient userClient;
    protected final UserService userService;

    RoomMapper(UserClient userClient, UserService userService) {
        this.userClient = userClient;
        this.userService = userService;
    }

    @Named("toRoomResponse")
    public RoomResponse toRoomResponse(Room room, String currentUserId) {
        RoomResponse response =
                RoomResponse.builder().id(room.getId()).type(room.getType()).build();

        if (room.getType().equals(RoomType.SINGLE)) {
            SingleRoom singleRoom = (SingleRoom) room;
            response.setSA(singleRoom.isSA());
            var userIdOptional = room.getMembers().stream()
                    .filter(member -> !member.equals(currentUserId))
                    .findFirst();
            if (userIdOptional.isPresent()) {
                String userId = userIdOptional.get();
                var userOptional = userService.getUserInfo(userId);
                userOptional.ifPresent(user -> {
                    response.setAvatar(user.getAvatar());
                    response.setName(user.getName());
                });
            } else {
                response.setName("Unknown");
            }
        }
        return response;
    }
}
