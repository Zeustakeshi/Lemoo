/*
 *  AddToCartRequest
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:44 PM
 * */

package com.lemoo.order_v2.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddToCartRequest {

	@NotEmpty
	@NotNull private String lemooSku;

	@Min(1)
	@NotNull private Integer quantity;
}
