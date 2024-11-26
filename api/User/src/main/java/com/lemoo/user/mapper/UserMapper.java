/*
 *  UserMapper
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:43 PM
 * */

package com.lemoo.user.mapper;

import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
	UserResponse userToUserResponse(User user);
}
