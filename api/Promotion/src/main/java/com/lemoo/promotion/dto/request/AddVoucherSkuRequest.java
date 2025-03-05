/*
 *  AddVoucherSkuRequest
 *  @author: Minhhieuano
 *  @created 3/5/2025 2:11 PM
 * */


package com.lemoo.promotion.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class AddVoucherSkuRequest {
    @Size(min = 1)
    private Set<String> skus;
}
