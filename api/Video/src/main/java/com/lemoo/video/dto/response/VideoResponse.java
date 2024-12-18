/*
 *  VideoResponse
 *  @author: Minhhieuano
 *  @created 12/17/2024 9:13 PM
 * */

package com.lemoo.video.dto.response;

import com.lemoo.video.common.enums.VideoStatus;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoResponse {
	private String id;

	@Builder.Default
	private Long views = 0L;

	private String url;

	private VideoStatus status;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
