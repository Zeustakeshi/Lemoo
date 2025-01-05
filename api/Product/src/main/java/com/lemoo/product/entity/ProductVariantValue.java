/*
 *  ProductVariantValue
 *  @author: Minhhieuano
 *  @created 1/5/2025 5:33 PM
 * */


package com.lemoo.product.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductVariantValue {
    private String code;
    private String name;
}
