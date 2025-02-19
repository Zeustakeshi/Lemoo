/*
 *  BatchFetchUserInfoRequest
 *  @author: Minhhieuano
 *  @created 2/12/2025 9:07 AM
 * */


package com.lemoo.user.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class BatchFetchUserInfoRequest {
    private Set<String> users;
}
