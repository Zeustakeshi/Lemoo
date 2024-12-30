/*
 *  UpdateVideoMetadataRequest
 *  @author: Minhhieuano
 *  @created 12/17/2024 7:42 PM
 * */

package com.lemoo.video.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.Set;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateVideoMetadataRequest {

	@Size(max = 6)
	private Set<String> products;

	@NotEmpty
	@Size(min = 1, max = 30)
	private Set<String> tags;

	private Boolean isPublic;
}
