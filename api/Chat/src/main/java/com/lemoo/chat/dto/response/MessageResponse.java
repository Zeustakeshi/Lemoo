/*
 *  MessageResponse
 *  @author: Minhhieuano
 *  @created 2/8/2025 10:03 AM
 * */


package com.lemoo.chat.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MessageResponse {
    private String id;
    private UserResponse sender;
    private String text;
    private LocalDateTime timestamp;
}
