/*
 *  ProductMedia
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:38 PM
 * */

package com.lemoo.product.entity;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.product.common.enums.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductMedia {
	private String id = NanoIdUtils.randomNanoId();
	private String url;
	private MediaType type;
}
