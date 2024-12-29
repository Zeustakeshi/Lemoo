/*
 *  CategoryRequest
 *  @author: Minhhieuano
 *  @created 12/14/2024 8:46 AM
 * */

package com.lemoo.product.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class CategoryRequestWithFile extends CategoryRequest {
    @NotNull
    private MultipartFile image;
}
