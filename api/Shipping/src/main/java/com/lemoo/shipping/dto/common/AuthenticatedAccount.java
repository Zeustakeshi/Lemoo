/*
 *  AuthenticatedAccount
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:21 AM
 * */


package com.lemoo.shipping.dto.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticatedAccount {
    private String id;
    private String userId;
    private String email;
}