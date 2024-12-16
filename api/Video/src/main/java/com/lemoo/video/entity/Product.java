/*
 *  Product
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:46 PM
 * */


package com.lemoo.video.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private String id;
    private String name;
    private String image;
    private String price;
}
