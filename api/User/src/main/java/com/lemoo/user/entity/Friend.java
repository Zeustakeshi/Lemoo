package com.lemoo.user.entity;

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
public class Friend extends BaseEntity {

	@Column(nullable = false)
	private String user1Id;

	@Column(nullable = false)
	private String user2Id;

	private String updatedBy;
}
