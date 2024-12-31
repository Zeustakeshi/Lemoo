/*
 *  FirstPuchaseVoucherRequest
 *  @author: Minhhieuano
 *  @created 12/31/2024 10:46 AM
 * */


package com.lemoo.promotion.dto.request;

import com.lemoo.promotion.common.enums.VoucherScope;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class FirstPurchaseVoucherRequest extends SellerVoucherRequest {
    @NotNull
    private VoucherScope scope;
    private LocalDateTime voucherExpireIn;
}
