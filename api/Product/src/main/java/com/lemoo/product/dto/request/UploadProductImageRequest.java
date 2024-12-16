/*
 *  UploadProductMediaRequest
 *  @author: Minhhieuano
 *  @created 12/15/2024 10:31 PM
 * */


package com.lemoo.product.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class UploadProductImageRequest {

    @NotNull
    private MultipartFile image;

    @NotNull
    @Min(1)
    @Max(3)
    private Integer type;

    private String imageId;
}
