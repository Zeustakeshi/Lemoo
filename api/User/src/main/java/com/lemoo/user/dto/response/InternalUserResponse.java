/*
 *  UserInternalResponse
 *  @author: Minhhieuano
 *  @created 1/4/2025 4:28 PM
 * */


package com.lemoo.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InternalUserResponse {
    private String id;
    private String name;
    private String avatar;
}
