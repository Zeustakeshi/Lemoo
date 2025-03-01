/*
 *  UserStoreResponse
 *  @author: Minhhieuano
 *  @created 3/1/2025 8:56 PM
 * */


package com.lemoo.store.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StorePublicResponse {
    private String id;
    private String name;
    private String logo;
    private Long follower;
}
