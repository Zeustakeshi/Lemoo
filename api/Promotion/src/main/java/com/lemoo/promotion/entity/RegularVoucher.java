/*
 *  RegularVoucher
 *  @author: Minhhieuano
 *  @created 12/27/2024 4:52 PM
 * */

package com.lemoo.promotion.entity;

import com.lemoo.promotion.common.enums.VoucherType;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class RegularVoucher extends SellerVoucher {
    @Builder.Default
    private final VoucherType voucherType = VoucherType.REGULAR_VOUCHER;
}
