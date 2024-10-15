/*
 *  User
 *  @author: Minhhieuano
 *  @created 10/15/2024 9:36 PM
 * */


package com.lemoo.user.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
public class User extends BaseEntity {
}
