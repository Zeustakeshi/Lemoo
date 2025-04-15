/*
 *  ShippingOrderLog
 *  @author: pc
 *  @created 4/15/2025 9:17 AM
 * */


package com.lemoo.shipping.entity;

import com.lemoo.shipping.common.enums.ShippingOrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShippingOrderLog {
    private ShippingOrderStatus status;
    private String tripCode;
    private String updatedDate;
}
