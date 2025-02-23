/*
 *  RegularVoucherResponse
 *  @author: Minhhieuano
 *  @created 12/31/2024 1:38 PM
 * */


package com.lemoo.promotion.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class RegularVoucherResponse extends BaseVoucherResponse {
    private Long budget;
}
