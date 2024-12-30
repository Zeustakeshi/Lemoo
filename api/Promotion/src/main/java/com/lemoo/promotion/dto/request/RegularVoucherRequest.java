/*
 *  RegularVoucherRequest
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:39 PM
 * */

package com.lemoo.promotion.dto.request;

import com.lemoo.promotion.common.enums.VoucherScope;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegularVoucherRequest extends SellerVoucherRequest {
    @NotNull
    private VoucherScope scope;
}
