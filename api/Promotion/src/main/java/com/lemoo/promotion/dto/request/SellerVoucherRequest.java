/*
 *  BaseVouchderRequest
 *  @author: Minhhieuano
 *  @created 12/28/2024 1:00 AM
 * */

package com.lemoo.promotion.dto.request;

import com.lemoo.promotion.common.enums.DiscountType;
import com.lemoo.promotion.common.enums.VoucherScope;
import com.lemoo.promotion.common.enums.VoucherType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class SellerVoucherRequest {
    @NotEmpty
    @Size(min = 5, max = 50)
    private String name;

    @NotNull
    private LocalDateTime periodStartTime;

    @NotNull
    private LocalDateTime periodEndTime;

    @NotNull
    private LocalDateTime collectionStartTime;

    private VoucherType voucherType;

    @NotNull
    private DiscountType discountType;

    @NotNull
    @Min(1)
    private Long discountValue;

    @Min(1000)
    private Long minimumOrderValue;

    private Long maximumDiscountValue;

    @Min(1)
    private Long totalAvailable;

    @Min(1)
    private Long limit;

    @Min(100000)
    private Long budget;

    @NotNull
    private VoucherScope scope;
}
