/*
 *  Media
 *  @author: Minhhieuano
 *  @created 12/26/2024 12:54 AM
 * */


package com.lemoo.media.entity;

import com.lemoo.media.common.enums.MediaType;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document("media")
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BaseMedia extends BaseEntity {
    private String url;

    private String publicId;

    @Indexed
    private String storeId;

    @Indexed
    private String channelId;

    private String userId;

    private MediaType type;

    private Map<String, String> metadata;
}
