/*
 *  UserResponse
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:25 PM
 * */

package com.lemoo.socket.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String id;
    private String name;
    private String avatar;
}
