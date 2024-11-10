package com.lemoo.user.dto.response;

import com.lemoo.user.common.enums.FriendInvitationStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Builder
@Data
public class FriendInvitationResponse {

    private String id;

    private String senderId;

    private String receiverId;

    private FriendInvitationStatus status;

    private String updateBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
