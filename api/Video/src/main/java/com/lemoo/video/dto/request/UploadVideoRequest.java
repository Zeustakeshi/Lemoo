/*
 *  UploadVideoRequest
 *  @author: Minhhieuano
 *  @created 12/17/2024 7:41 PM
 * */

package com.lemoo.video.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadVideoRequest {
	@NotNull private MultipartFile video;
}
