package com.lemoo.user.dto.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FriendInvitationResponse {

	private String userId;

	private String avatar;

	private String username;

	private LocalDateTime timestamp;

	private String requestId;
}
