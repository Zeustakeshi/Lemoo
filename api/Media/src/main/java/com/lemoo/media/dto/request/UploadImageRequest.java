/*
 *  UploadImageRequest
 *  @author: Minhhieuano
 *  @created 12/26/2024 1:10 AM
 * */

package com.lemoo.media.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadImageRequest {
	@NotNull private MultipartFile image;
}
