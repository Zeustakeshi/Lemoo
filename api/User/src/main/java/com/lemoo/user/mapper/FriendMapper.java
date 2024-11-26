package com.lemoo.user.mapper;

import com.lemoo.user.dto.response.FriendResponse;
import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.Friend;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FriendMapper {

	@Mapping(source = "userResponse.id", target = "id")
	@Mapping(source = "userResponse.displayName", target = "username")
	@Mapping(source = "userResponse.avatar", target = "avatar")
	FriendResponse friendToResponse(Friend friend, UserResponse userResponse);
}
