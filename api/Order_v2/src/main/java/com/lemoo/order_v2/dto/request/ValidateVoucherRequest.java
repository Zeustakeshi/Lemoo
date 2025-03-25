/*
 *  InternalValidateVoucherRequest
 *  @author: pc
 *  @created 3/26/2025 12:41 AM
 * */


package com.lemoo.order_v2.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class ValidateVoucherRequest {
    private String userId;
    private Set<String> voucherIds;
    private Set<String> skus;
}
