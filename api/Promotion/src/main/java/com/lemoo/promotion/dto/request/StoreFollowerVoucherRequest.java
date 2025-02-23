/*
 *  StoreFollowerVoucher
 *  @author: Minhhieuano
 *  @created 12/31/2024 10:19 AM
 * */


package com.lemoo.promotion.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class StoreFollowerVoucherRequest extends BaseVoucherRequest {
    private LocalDateTime voucherExpireIn;
    private Integer limit;
}
