/*
 *  MessageResponse
 *  @author: Minhhieuano
 *  @created 2/8/2025 10:03 AM
 * */


package com.lemoo.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
public class MessageResponse {
    private String id;
    private UserResponse sender;
    private String text;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    @JsonProperty("isSelf")
    private boolean isSelf;

    private Set<String> viewers;
}
