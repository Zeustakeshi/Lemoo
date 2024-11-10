package com.lemoo.user.entity;

import com.lemoo.user.common.enums.FriendStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@DynamicInsert
public class Friend extends BaseEntity{

    @Column(nullable = false)
    private String user1Id;

    @Column(nullable = false)
    private String user2Id;

    @Enumerated(EnumType.STRING)
    private FriendStatus status;

    private String updatedBy;

}
