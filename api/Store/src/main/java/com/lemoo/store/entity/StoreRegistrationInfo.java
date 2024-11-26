/*
 *  StoreRegistrationInfo
 *  @author: Minhhieuano
 *  @created 11/13/2024 9:08 PM
 * */


package com.lemoo.store.entity;

import com.lemoo.store.common.enums.BusinessType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoreRegistrationInfo extends BaseEntity {
    private String identityCardName;
    private String identityCardNumber;
    private String identityCardFrontSide;
    private String identityCardBackSide;
    private String TIN;
    private String taxRegistrationDocument;
    private String bankDocument;
    private String bankAccountName;
    private String bankAccountNumber;
    private String bankName;
    private String bankBranch;

    @Enumerated(EnumType.STRING)
    private BusinessType businessType;

    private String enterpriseBusinessRegistration;
    private String companyLegalName;
    private String businessOwnerName;
    private String businessRegistrationNumber;
}
