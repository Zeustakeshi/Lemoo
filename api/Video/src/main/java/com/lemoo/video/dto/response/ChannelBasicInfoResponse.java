/*
 *  ChannelBasicInfoResponse
 *  @author: Minhhieuano
 *  @created 12/18/2024 1:16 PM
 * */


package com.lemoo.video.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelBasicInfoResponse {
    private String id;
    private String name;
    private String avatar;
}
