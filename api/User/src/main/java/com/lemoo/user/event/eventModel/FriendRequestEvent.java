package com.lemoo.user.event.eventModel;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequestEvent extends Event {

	private String receiverId;
	private String senderId;

	@Override
	protected void setGroupId(String groupId) {
		this.groupId = "E_004";
	}
}
