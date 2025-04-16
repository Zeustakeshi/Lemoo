/*
 *  StoreResponse
 *  @author: pc
 *  @created 4/16/2025 9:02 AM
 * */


package com.lemoo.product.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreResponse {
    private String id;
    private String name;
    private String logo;
}
