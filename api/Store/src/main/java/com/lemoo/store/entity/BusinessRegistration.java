/*
 *  BusinessRegistration
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:46 PM
 * */


package com.lemoo.store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lemoo.store.common.enums.BusinessType;
import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BusinessRegistration extends BaseEntity {

    @Column(nullable = false)
    private String companyLegalName;

    @Column(nullable = false)
    private String businessOwnerName;

    @Column(nullable = false)
    private String businessRegistrationNumber;
    private String businessRegistrationCertificate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private BusinessType type = BusinessType.COMPANY;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Store store;
}
