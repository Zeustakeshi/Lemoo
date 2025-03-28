/*
 *  BasePartialAddress
 *  @author: pc
 *  @created 3/27/2025 5:28 PM
 * */


package com.lemoo.order_v2.dto.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BasePartialAddress {
    private String code;
    private String name;
}
