package com.lemoo.user.event.eventModel;

import com.lemoo.user.common.enums.FriendInvitationStatus;
import lombok.*;


@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequestEvent extends Event{

    private String invitationId;
    private String senderId;
    private String senderName;
    private String senderAvatar;
    private String receiverId;

    private FriendInvitationStatus status;

    @Override
    protected void setGroupId(String groupId) {
        this.groupId = "E_004";
    }
}
