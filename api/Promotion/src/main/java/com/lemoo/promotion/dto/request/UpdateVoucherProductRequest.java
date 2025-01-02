/*
 *  AddProductToVoucherRequest
 *  @author: Minhhieuano
 *  @created 1/1/2025 11:20 PM
 * */


package com.lemoo.promotion.dto.request;

import com.lemoo.promotion.common.enums.VoucherType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class UpdateVoucherProductRequest {

    @NotEmpty
    @Size(min = 1, max = 100)
    private Set<String> skus;

    @NotNull
    private VoucherType voucherType;
}
