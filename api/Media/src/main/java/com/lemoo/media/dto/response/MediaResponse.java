/*
 *  MediaResponse
 *  @author: Minhhieuano
 *  @created 12/26/2024 1:08 AM
 * */


package com.lemoo.media.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MediaResponse {
    @NotNull
    private String id;

    @NotNull
    private String url;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
