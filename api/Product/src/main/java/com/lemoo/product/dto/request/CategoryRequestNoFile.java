/*
 *  CategoryRequestNoFile
 *  @author: Minhhieuano
 *  @created 12/29/2024 2:16 PM
 * */


package com.lemoo.product.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryRequestNoFile extends CategoryRequest {

    @NotEmpty
    private String imageUrl;
}
