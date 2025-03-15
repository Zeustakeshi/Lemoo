/*
 *  Account
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:13 PM
 * */

package com.lemoo.auth.entity;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.auth.common.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Account extends BaseEntity implements UserDetails {

    @Builder.Default
    @Column(nullable = false, unique = true, updatable = false)
    private String profileId = NanoIdUtils.randomNanoId();

    @Column(nullable = false)
    private String username;

    private String defaultAvatar;

    @Column(unique = true)
    private String phone;

    @Column(unique = true, nullable = false)
    private String email;

    @Builder.Default
    private Boolean activeMfa = false;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<Role> authorities = new HashSet<>();

    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toSet());
    }

    public void addAuthority(Role role) {
        this.authorities.add(role);
    }
}
