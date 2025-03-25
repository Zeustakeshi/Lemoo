/*
 *  InternalVoucherService
 *  @author: pc
 *  @created 3/26/2025 12:18 AM
 * */

package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.request.InternalValidateVoucherRequest;

public interface InternalVoucherService {
    Boolean canApplyVoucher(InternalValidateVoucherRequest request);
}
