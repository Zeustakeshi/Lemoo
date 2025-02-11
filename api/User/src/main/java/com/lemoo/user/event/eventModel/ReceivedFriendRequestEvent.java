package com.lemoo.user.event.eventModel;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class ReceivedFriendRequestEvent extends Event {

    private String receiverId;
    private String senderId;


}
