/*
 *  StoreInfoResponse
 *  @author: Minhhieuano
 *  @created 1/4/2025 1:20 PM
 * */


package com.lemoo.video.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InternalStoreResponse {
    private String id;
    private String name;
    private String shortCode;
    private String logo;
}
