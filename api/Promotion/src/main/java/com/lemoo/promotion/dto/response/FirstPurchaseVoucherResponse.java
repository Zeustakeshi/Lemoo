/*
 *  FirstPurchaseVoucherResponse
 *  @author: Minhhieuano
 *  @created 12/31/2024 1:40 PM
 * */


package com.lemoo.promotion.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class FirstPurchaseVoucherResponse extends BaseVoucherResponse {
    private LocalDateTime voucherExpireIn;
}
