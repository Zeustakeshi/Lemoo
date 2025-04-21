/*
 *  VoucherTransaction
 *  @author: pc
 *  @created 4/21/2025 11:29 AM
 * */


package com.lemoo.promotion.entity;

import com.lemoo.promotion.common.enums.VoucherTransactionStatus;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoucherTransaction extends BaseVoucher {
    private String voucherId;
    private String ownerId;
    private String targetId;
    private Integer amount;
    private VoucherTransactionStatus status;
}
