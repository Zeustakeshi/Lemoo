/*
 *  User
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:26 PM
 * */

package com.lemoo.user.entity;

import com.lemoo.user.common.enums.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDate;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@DynamicInsert
public class User extends BaseEntity {

	private String avatar;

	@Column(nullable = false)
	private String displayName;

	@Column(nullable = false, unique = true)
	private String accountId;

	private LocalDate dateOfBirth;

	private String address;

	@Enumerated(EnumType.STRING)
	private Gender gender;
}
