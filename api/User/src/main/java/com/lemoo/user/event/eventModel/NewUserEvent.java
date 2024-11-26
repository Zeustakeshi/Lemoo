/*
 *  CreateUserProfileEvent
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:38 AM
 * */

package com.lemoo.user.event.eventModel;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class NewUserEvent extends Event {

	private String displayName;
	private String accountId;
	private String userId;

	@Override
	protected void setGroupId(String groupId) {
		this.groupId = "E_001";
	}
}
