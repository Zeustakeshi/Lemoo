package com.lemoo.user.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendResponse {

    private String friendId;

    private String  friendName;

    private String friendAvatar;

}
