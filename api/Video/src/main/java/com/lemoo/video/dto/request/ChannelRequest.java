/*
 *  CreateChannelRequest
 *  @author: Minhhieuano
 *  @created 12/17/2024 12:03 AM
 * */


package com.lemoo.video.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChannelRequest {

    @NotEmpty
    @Size(min = 5, max = 20)
    private String name;

    @Size(min = 5, max = 1000)
    private String description;
}
