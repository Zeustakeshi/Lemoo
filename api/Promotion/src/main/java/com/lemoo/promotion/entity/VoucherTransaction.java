/*
 *  VoucherTransaction
 *  @author: pc
 *  @created 4/21/2025 11:29 AM
 * */


package com.lemoo.promotion.entity;

import com.lemoo.promotion.common.enums.VoucherTransactionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class VoucherTransaction extends BaseEntity {
    private String voucherId;
    private String ownerId;
    private String targetId;
    private Integer amount;
    private VoucherTransactionStatus status;
}
