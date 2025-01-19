/*
 *  UserVoucherResponse
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:38 PM
 * */


package com.lemoo.promotion.dto.response;

import com.lemoo.promotion.common.enums.UserVoucherStatus;
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
    private String voucherId;
    private UserVoucherStatus status;
    private LocalDateTime collectedAt;
}
