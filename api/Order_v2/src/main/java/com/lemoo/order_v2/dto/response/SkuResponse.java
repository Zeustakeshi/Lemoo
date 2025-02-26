/*
 *  SkuResponse
 *  @author: Minhhieuano
 *  @created 1/25/2025 12:02 PM
 * */

package com.lemoo.order_v2.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SkuResponse {
	private String skuCode;
	private String name;
	private String productId;
	private String storeId;
	private Long price;
	private Long stock;
	private String image;
}
