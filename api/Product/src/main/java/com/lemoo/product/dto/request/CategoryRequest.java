/*
 *  CategoryRequestWithImageUrl
 *  @author: Minhhieuano
 *  @created 12/29/2024 2:06 PM
 * */


package com.lemoo.product.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public abstract class CategoryRequest {
    @NotEmpty
    private String name;
    private String parentId;
    private String imageUrl;
    private MultipartFile image;
}
