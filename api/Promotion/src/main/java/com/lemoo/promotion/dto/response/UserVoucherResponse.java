/*
 *  UserVoucherResponse
 *  @author: Minhhieuano
 *  @created 2/24/2025 9:17 PM
 * */


package com.lemoo.promotion.dto.response;

import com.lemoo.promotion.common.enums.DiscountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserVoucherResponse {
    private String id;
    private String name;
    private LocalDateTime periodStartTime;
    private LocalDateTime periodEndTime;
    private LocalDateTime collectStartTime;
    private DiscountType discountType;
    private Long discountValue;
}
