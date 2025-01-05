/*
 *  ProductVariantRequest
 *  @author: Minhhieuano
 *  @created 1/5/2025 5:36 PM
 * */


package com.lemoo.product.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ProductVariantRequest {
    private String name;
    private List<String> values;
}
