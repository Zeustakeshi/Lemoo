/*
 *  CommentRequest
 *  @author: Minhhieuano
 *  @created 12/18/2024 4:30 PM
 * */

package com.lemoo.video.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentRequest {

	@NotEmpty
	@Size(min = 5, max = 1500)
	private String content;

	private String parent;
}
