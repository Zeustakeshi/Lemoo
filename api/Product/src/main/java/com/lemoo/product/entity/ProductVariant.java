/*
 *  ProductAttribute
 *  @author: Minhhieuano
 *  @created 12/14/2024 10:30 AM
 * */

package com.lemoo.product.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariant {

    @Indexed
    private String name; // / color, size, ....

    private List<String> values; // [red, green, blue, ...]
}
