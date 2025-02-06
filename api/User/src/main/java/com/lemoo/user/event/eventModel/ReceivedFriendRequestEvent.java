package com.lemoo.user.event.eventModel;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class ReceivedFriendRequestEvent extends Event{

    private String receiverId;
    private String senderId;

    @Override
    protected void setGroupId(String groupId) {
        this.groupId = "E_005";
    }
}
