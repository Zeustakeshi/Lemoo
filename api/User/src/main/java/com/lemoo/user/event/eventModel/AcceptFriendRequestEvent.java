package com.lemoo.user.event.eventModel;


import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AcceptFriendRequestEvent extends Event{

    private String senderId;
    private String receiverId;
    private String receiverName;
    private String receiverAvatar;

    @Override
    protected void setGroupId(String groupId) { this.groupId = "E_005"; }
}
