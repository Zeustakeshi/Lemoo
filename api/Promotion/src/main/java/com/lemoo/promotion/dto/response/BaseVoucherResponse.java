/*
 *  VoucherResponse
 *  @author: Minhhieuano
 *  @created 12/31/2024 1:35 PM
 * */


package com.lemoo.promotion.dto.response;

import com.lemoo.promotion.common.enums.DiscountType;
import com.lemoo.promotion.common.enums.VoucherScope;
import com.lemoo.promotion.common.enums.VoucherStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public abstract class BaseVoucherResponse {
    private String id;
    private String name;
    private VoucherStatus status;
    private LocalDateTime periodStartTime;
    private LocalDateTime periodEndTime;
    private LocalDateTime collectStartTime;
    private VoucherScope scope;
    private DiscountType discountType;
    private Long discountValue;
    private Long minimumOrderValue;
    private Long
            maximumDiscountValue;
    private Long totalAvailable;
    private Long limit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
