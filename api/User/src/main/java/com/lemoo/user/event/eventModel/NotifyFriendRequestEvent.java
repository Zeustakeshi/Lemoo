package com.lemoo.user.event.eventModel;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class NotifyFriendRequestEvent extends Event {

    private String receiverId;
    private String senderId;


}
