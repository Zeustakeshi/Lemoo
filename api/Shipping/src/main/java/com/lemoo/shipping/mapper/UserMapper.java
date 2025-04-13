/*
 *  UserMapper
 *  @author: Minhhieuano
 *  @created 2/7/2025 11:13 PM
 * */


package com.lemoo.shipping.mapper;

import com.lemoo.shipping.dto.common.UserHash;
import com.lemoo.shipping.dto.response.UserResponse;
import org.mapstruct.Mapper;

import java.util.Map;

@Mapper
public abstract class UserMapper {
    public abstract UserHash toUserHash(UserResponse user);

    public abstract UserResponse toUser(UserHash userHash);

    public UserHash toUserHash(Map<String, String> userMap) {
        return UserHash.builder()
                .id(userMap.get("id"))
                .name(userMap.get("name"))
                .avatar(userMap.get("avatar"))
                .build();
    }

    public Map<String, String> toUserMap(UserHash userHash) {
        return Map.of(
                "id", userHash.getId(),
                "avatar", userHash.getAvatar(),
                "name", userHash.getName()
        );
    }


}
