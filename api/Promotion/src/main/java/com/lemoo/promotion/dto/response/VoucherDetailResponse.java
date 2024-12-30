/*
 *  VoucherResponse
 *  @author: Minhhieuano
 *  @created 12/27/2024 8:36 PM
 * */

package com.lemoo.promotion.dto.response;

import com.lemoo.promotion.common.enums.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherDetailResponse {
	private String id;
	private String name; // Title or description of the voucher

	private VoucherStatus status;

	private VoucherType type; // Type of voucher, e.g., "follow_discount" or "new_customer"

	private VoucherTimeType voucherTimeType;
	private LocalDateTime periodStartTime; // The period start time that customers can use the voucher
	private LocalDateTime periodEndTime; // The period end time that customers can use the voucher
	private LocalDateTime collectionStartTime; // The time that customers can collect the voucher

	private VoucherScope scope; // Scope type: "entire_store" or "specific_products"

	private DiscountType discountType;
	private Long discountValue;

	private Long minimumOrderValue; // Discount details, if order value reaches criteria_over_money value, will discount
	// money value
	private Long
			maximumDiscountValue; // Discount details, if order value reaches criteria_over_money value, allow maximum
	// discount per order, just support percentage discount off type

	private Long totalAvailable;
	private Long limit;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
