/*
 *  Video
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:49 PM
 * */

package com.lemoo.video.entity;

import com.lemoo.video.common.enums.VideoStatus;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
@CompoundIndex(unique = true, def = "{channelId: 1, name: 1}")
public class Video extends BaseEntity {

	@Indexed
	private String channelId;

	private String url;

	private Set<String> tags;

	@Builder.Default
	private VideoStatus status = VideoStatus.DRAFT;

	private Set<Product> products;

	@Builder.Default
	private Long views = 0L;
}
