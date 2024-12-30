/*
 *  CategoryResponse
 *  @author: Minhhieuano
 *  @created 12/14/2024 8:40 AM
 * */

package com.lemoo.product.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {

	private String id;
	private String name;
	private String image;

	@JsonProperty("isLeaf")
	private boolean isLeaf;
}
