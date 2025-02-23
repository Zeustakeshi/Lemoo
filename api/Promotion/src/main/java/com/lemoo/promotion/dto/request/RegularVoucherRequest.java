/*
 *  RegularVoucherRequest
 *  @author: Minhhieuano
 *  @created 12/31/2024 10:11 AM
 * */


package com.lemoo.promotion.dto.request;

import com.lemoo.promotion.common.enums.VoucherScope;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RegularVoucherRequest extends BaseVoucherRequest {
    @Min(100_000)
    private Long budget;

    @NotNull
    private VoucherScope scope;

    @Min(1)
    @NotNull
    private Long limit;
}
