/*
 *  StoreFollowerVoucher
 *  @author: Minhhieuano
 *  @created 12/31/2024 10:21 AM
 * */


package com.lemoo.promotion.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class StoreFollowerVoucher extends BaseVoucher {
    private LocalDateTime voucherExpireIn;
}
