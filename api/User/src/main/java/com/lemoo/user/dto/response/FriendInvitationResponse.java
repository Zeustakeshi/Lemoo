package com.lemoo.user.dto.response;

import com.lemoo.user.common.enums.FriendInvitationStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Builder
@Data
public class FriendInvitationResponse {

    private String userId;

    private String avatar;

    private String username;

    private LocalDateTime timestamp;

    private String requestId;

}
