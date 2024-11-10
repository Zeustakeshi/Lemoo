package com.lemoo.user.mapper;

import com.lemoo.user.dto.response.FriendInvitationResponse;
import com.lemoo.user.entity.FriendInvitation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FriendInvitationMapper {

    FriendInvitationResponse invitationToResponse(FriendInvitation invitation);

}
