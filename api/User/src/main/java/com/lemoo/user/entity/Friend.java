package com.lemoo.user.entity;

import com.lemoo.user.common.enums.FriendShipStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@DynamicInsert
public class FriendShip extends BaseEntity{

    @Column(nullable = false, unique = true)
    private String userId1;

    @Column(nullable = false, unique = true)
    private String userId2;

    @Enumerated(EnumType.STRING)
    private FriendShipStatus status;

    private String updatedBy;

}
