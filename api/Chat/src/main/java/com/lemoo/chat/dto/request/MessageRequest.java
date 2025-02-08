/*
 *  MessageRequest
 *  @author: Minhhieuano
 *  @created 2/8/2025 10:08 AM
 * */


package com.lemoo.chat.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MessageRequest {
    @NotEmpty
    @Size(max = 15000)
    private String text;
}
