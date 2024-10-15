/*
 *  Account
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:13 PM
 * */


package com.lemoo.auth.entity;

import com.lemoo.auth.common.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Account extends BaseEntity {

    @Column(nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String phone;

    @Column(unique = true, nullable = false)
    private String email;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<Role> authorities = new HashSet<>();

    private String avatar;

    @Column(nullable = false)
    private String password;
}
