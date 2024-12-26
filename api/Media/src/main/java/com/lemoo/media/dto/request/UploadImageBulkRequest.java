/*
 *  UploadImageBulkRequest
 *  @author: Minhhieuano
 *  @created 12/26/2024 1:11 AM
 * */


package com.lemoo.media.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class UploadImageBulkRequest {
    @NotNull
    @Size(min = 2, max = 5)
    private List<MultipartFile> images;
}
