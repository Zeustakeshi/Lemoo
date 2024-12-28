/*
 *  ProductVariantResponse
 *  @author: Minhhieuano
 *  @created 12/16/2024 1:06 AM
 * */

package com.lemoo.product.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductVariantResponse {
	private String id;
	private String sellerSku;
	private String name;
	private Boolean allowSale;
	private Long stock;
	private Long price;
}
