/*
 *  MediaRequest
 *  @author: Minhhieuano
 *  @created 12/26/2024 3:51 PM
 * */


package com.lemoo.product.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaRequest {

    @NotNull
    private String mediaId;

    @NotNull
    private String url;
}
