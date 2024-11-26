package com.lemoo.user.entity;

import com.lemoo.user.common.enums.FriendInvitationStatus;
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
public class FriendInvitation extends BaseEntity {

	@Column(nullable = false)
	private String senderId;

	@Column(nullable = false)
	private String receiverId;

	@Enumerated(EnumType.STRING)
	private FriendInvitationStatus status;

	private String updatedBy;
}
