package com.lemoo.user.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class FriendInvitationRequest {

	@NotEmpty
	private String senderId;

	@NotEmpty
	private String receiverId;
}
