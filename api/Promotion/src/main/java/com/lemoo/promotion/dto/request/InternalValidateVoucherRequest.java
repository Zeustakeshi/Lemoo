/*
 *  InternalValidateVoucherRequest
 *  @author: pc
 *  @created 3/26/2025 12:41 AM
 * */


package com.lemoo.promotion.dto.request;

import lombok.Data;

import java.util.Set;

@Data
public class InternalValidateVoucherRequest {
    private String userId;
    private Set<String> voucherIds;
    private Set<String> skus;
}
