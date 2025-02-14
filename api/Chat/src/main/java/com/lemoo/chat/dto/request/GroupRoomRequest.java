/*
 *  GroupRoomRequest
 *  @author: Minhhieuano
 *  @created 2/14/2025 5:06 PM
 * */


package com.lemoo.chat.dto.request;

import lombok.Data;

import java.util.Set;

@Data
public class GroupRoomRequest {
    private String name;
    private Set<String> members;
}
