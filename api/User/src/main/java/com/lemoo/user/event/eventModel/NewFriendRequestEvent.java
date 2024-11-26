package com.lemoo.user.event.eventModel;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class NewFriendRequestEvent extends Event {

	private String invitationId;
	private String receiverId;
	private String senderId;
	private String senderName;
	private String senderAvatar;

	@Override
	protected void setGroupId(String groupId) {
		this.groupId = "E_004";
	}
}
