/*
 *  ProductMedia
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:38 PM
 * */

package com.lemoo.product.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductMedia {
	private String id;
	private String url;
}
