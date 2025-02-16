package com.lemoo.chat.event.event.model;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class FriendCreatedEvent extends Event {
    private String friendId;
    private String user1Id;
    private String user2Id;
}
