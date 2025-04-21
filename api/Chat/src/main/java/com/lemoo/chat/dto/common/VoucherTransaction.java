/*
 *  VoucherTransaction
 *  @author: pc
 *  @created 4/21/2025 1:30 PM
 * */


package com.lemoo.chat.dto.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VoucherTransaction {
    private String userId;
    private String targetId;
    private String transactionId;
    private String voucherId;
    private String roomId;
}
