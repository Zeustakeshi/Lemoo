/*
 *  CitizenIdVerification
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:37 PM
 * */


package com.lemoo.store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CitizenIdVerification extends BaseEntity {
    @Column(nullable = false)
    private String cardName;

    @Column(nullable = false)
    private String cardNumber;

    private String documentFrontSide; // image url

    private String documentBackSide; // image url

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Store store;


}
