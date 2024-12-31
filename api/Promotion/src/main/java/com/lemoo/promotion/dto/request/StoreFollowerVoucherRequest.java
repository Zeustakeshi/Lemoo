/*
 *  StoreFollowerVoucher
 *  @author: Minhhieuano
 *  @created 12/31/2024 10:19 AM
 * */


package com.lemoo.promotion.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class StoreFollowerVoucherRequest extends SellerVoucherRequest {
    private LocalDateTime voucherExpireIn;

    @Min(1)
    @NotNull
    private Long limit;
}
