/*
 *  DeleteProductImageRequest
 *  @author: Minhhieuano
 *  @created 12/15/2024 11:04 PM
 * */

package com.lemoo.product.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeleteProductImageRequest {
	@NotNull @Min(1)
	@Max(3)
	private Integer type;

	@NotEmpty
	private String imageId;
}
