package com.lemoo.user.event.eventModel;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class NotifyAcceptFriendEvent extends Event {

    private String receiverId;
    private String senderId;


}
