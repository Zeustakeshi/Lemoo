/*
 *  BasePartialAddress
 *  @author: pc
 *  @created 3/27/2025 5:28 PM
 * */


package com.lemoo.chat_ai_mcp_server.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BasePartialAddress {
    private String code;
    private String name;
}
