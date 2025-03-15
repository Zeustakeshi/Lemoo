/*
 *  GoogleAccountResponse
 *  @author: Minhhieuano
 *  @created 3/15/2025 4:51 PM
 * */


package com.lemoo.auth.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OAuthAccount {
    private String name;
    private String email;
    private String picture;
}
