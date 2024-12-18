/*
 *  VideoViewResponse
 *  @author: Minhhieuano
 *  @created 12/18/2024 1:14 PM
 * */


package com.lemoo.video.dto.response;

import com.lemoo.video.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoViewResponse {
    private String id;
    private String name;
    private String description;
    private Set<String> tags;
    private String url;
    private Set<Product> products;
    private Long views;
    private ChannelBasicInfoResponse channel;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
