/*
 *  ShareVoucherRequest
 *  @author: pc
 *  @created 4/21/2025 10:02 AM
 * */


package com.lemoo.promotion.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ShareVoucherRequest {

    @NotEmpty
    private String voucherId;

    @NotEmpty
    private String targetId;

    @NotNull
    private Integer amount;

    @NotEmpty
    private String chatId;
}
