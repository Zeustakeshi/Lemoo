/*
 *  UserHash
 *  @author: Minhhieuano
 *  @created 2/7/2025 10:49 PM
 * */


package com.lemoo.chat.dto.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserHash {
    private String id;
    private String name;
    private String avatar;
}
