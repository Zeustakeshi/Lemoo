/*
 *  MediaResponse
 *  @author: Minhhieuano
 *  @created 12/26/2024 3:50 PM
 * */

package com.lemoo.product.dto.response;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MediaResponse {
	@NotNull private String id;

	@NotNull private String url;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
