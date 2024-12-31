/*
 *  RegulaVoucher
 *  @author: Minhhieuano
 *  @created 12/31/2024 10:08 AM
 * */


package com.lemoo.promotion.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RegularVoucher extends SellerVoucher {
    private Long budget;
}
