/*
 *  CategoryRequest
 *  @author: Minhhieuano
 *  @created 12/14/2024 8:46 AM
 * */

package com.lemoo.product.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryRequest {

	@NotEmpty
	private String name;

	private String parentId;
}
