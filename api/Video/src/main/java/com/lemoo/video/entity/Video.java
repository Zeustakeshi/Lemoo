/*
 *  Video
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:49 PM
 * */


package com.lemoo.video.entity;


import com.lemoo.video.common.enums.VideoStatus;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Video extends BaseEntity {

    @Indexed
    private String channelId;
    private String url;
    private List<String> tags;
    private VideoStatus status;
    private String name;
    private String description;
    private List<Product> products;
    private Integer views;
}
