/*
 *  ProductSearchResponse
 *  @author: pc
 *  @created 4/17/2025 11:43 PM
 * */


package com.lemoo.chat_ai_mcp_server.dto.response;

import lombok.Data;

@Data
public class ProductSearchResponse {
    private String id;
    private String name;
    private int price;
    private String image;
    private String sku_code;
    private String sku_name;
    private String store_id;
    private String store_name;
}
