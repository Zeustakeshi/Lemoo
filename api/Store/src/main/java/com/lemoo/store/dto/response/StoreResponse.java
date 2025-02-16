/*
 *  StoreResponse
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:31 PM
 * */

package com.lemoo.store.dto.response;

import com.lemoo.store.common.enums.StoreStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreResponse {
    private String id;
    private String shortCode;
    private String name;
    private String companyName;
    private String logo;
    private String email;
    private String phone;
    private StoreStatus status;
}
