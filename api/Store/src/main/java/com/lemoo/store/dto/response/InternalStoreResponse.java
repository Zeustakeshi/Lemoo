/*
 *  InternalStoreResponse
 *  @author: Minhhieuano
 *  @created 1/4/2025 4:14 PM
 * */


package com.lemoo.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InternalStoreResponse {
    private String id;
    private String name;
    private String shortCode;
    private String logo;
}