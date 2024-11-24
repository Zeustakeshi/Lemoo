package com.lemoo.user.mapper;

import com.lemoo.user.dto.response.FriendInvitationResponse;
import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.FriendInvitation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface FriendInvitationMapper {

    @Mappings({
            @Mapping(source = "invitation.senderId", target = "userId"),
            @Mapping(source = "user.avatar", target = "avatar"),
            @Mapping(source = "user.displayName", target = "username"),
            @Mapping(source = "invitation.id", target = "requestId"),
            @Mapping(source = "invitation.createdAt", target = "timestamp")
    })
    FriendInvitationResponse invitationToResponse(FriendInvitation invitation, UserResponse user);
}
