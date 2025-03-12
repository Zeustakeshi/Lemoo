/*
 *  AuthenticatedAccount
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:01 PM
 * */

package com.lemoo.notification.dto.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticatedAccount {
    private String id;
    private String userId;
    private String email;
}
