package com.lemoo.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendResponse {

    private String id;

    private String avatar;

    private String displayName;
}
