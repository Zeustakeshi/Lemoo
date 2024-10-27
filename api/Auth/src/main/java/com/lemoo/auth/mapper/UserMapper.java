/*
 *  UserMapper
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:19 AM
 * */

package com.lemoo.auth.mapper;

import com.lemoo.auth.dto.response.UserResponse;
import com.lemoo.auth.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

	@Mapping(target = "email", ignore = true)
	@Mapping(target = "phone", ignore = true)
	UserResponse userToUserResponse(User user);
}
