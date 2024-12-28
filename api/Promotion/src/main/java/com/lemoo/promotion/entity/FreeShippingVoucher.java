/*
 *  FreeShippingVoucher
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:11 PM
 * */

package com.lemoo.promotion.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class FreeShippingVoucher extends Voucher {
	private boolean isLimitBudget;
	private Long budget;
	private boolean isFreeShip;
}
