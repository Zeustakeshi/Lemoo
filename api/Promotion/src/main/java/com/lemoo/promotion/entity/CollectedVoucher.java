/*
 *  UserCollectedVoucher
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:30 PM
 * */


package com.lemoo.promotion.entity;

import com.lemoo.promotion.common.enums.CollectedVoucherStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class CollectedVoucher extends BaseEntity {

    @Indexed
    private String voucherId;

    @Indexed
    private String userId;

    @Builder.Default
    private Integer quantity = 0;

    private CollectedVoucherStatus status;

    private LocalDateTime collectedAt;
}
