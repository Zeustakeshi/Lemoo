/*
 *  CategoryRequest
 *  @author: Minhhieuano
 *  @created 12/14/2024 8:46 AM
 * */

package com.lemoo.product.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class CategoryRequest {

	@NotEmpty
	private String name;

	private String parentId;

	@NotNull private MultipartFile image;
}
