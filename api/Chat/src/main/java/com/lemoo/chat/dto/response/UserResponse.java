/*
 *  UserResponse
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:25 PM
 * */

package com.lemoo.chat.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private String id;
    private String name;
    private String avatar;
}
