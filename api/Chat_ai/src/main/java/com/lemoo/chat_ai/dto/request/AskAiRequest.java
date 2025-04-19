/*
 *  AskLemooAiRequest
 *  @author: pc
 *  @created 4/19/2025 10:43 PM
 * */


package com.lemoo.chat_ai.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AskAiRequest {

    @NotEmpty
    private String message;
}
