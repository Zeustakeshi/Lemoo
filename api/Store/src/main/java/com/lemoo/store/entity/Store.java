/*
 *  Store
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:20 PM
 * */

package com.lemoo.store.entity;

import com.lemoo.store.common.enums.StoreStatus;
import com.lemoo.store.common.enums.StoreType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Store extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String shortCode;

    @Column(unique = true, nullable = false)
    private String name;

    private String logo;

    @Column(unique = true)
    private String companyName;

    @Column(unique = true, nullable = false)
    private String phone;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String ownerId;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private StoreStatus status = StoreStatus.PENDING;


    private String location;

    @Enumerated(EnumType.STRING)
    private StoreType type;

    @ElementCollection(fetch = FetchType.LAZY)
    private Set<String> Banners;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private CitizenIdVerification citizenIdVerification;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private BusinessRegistration businessRegistration;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private BankInformation bankInformation;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private TaxInformation taxInformation;
}
