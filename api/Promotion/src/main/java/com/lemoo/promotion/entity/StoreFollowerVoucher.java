/*
 *  StoreFollowerVoucher
 *  @author: Minhhieuano
 *  @created 12/27/2024 4:54 PM
 * */


package com.lemoo.promotion.entity;

import com.lemoo.promotion.common.enums.VoucherType;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class StoreFollowerVoucher extends Voucher {

    @Builder.Default
    @Setter(AccessLevel.PRIVATE)
    private VoucherType voucherType = VoucherType.STORE_FOLLOWER_VOUCHER;


    private LocalDateTime storeTimeLimit; // Indicates if voucher expires after collection

}
