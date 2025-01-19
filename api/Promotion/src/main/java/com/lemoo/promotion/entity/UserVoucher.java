/*
 *  UserCollectedVoucher
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:30 PM
 * */


package com.lemoo.promotion.entity;

import com.lemoo.promotion.common.enums.UserVoucherStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserVoucher extends BaseEntity {

    @Indexed
    private String voucherId;

    @Indexed
    private String userId;

    private UserVoucherStatus status;
    
    private LocalDateTime collectedAt;
}
