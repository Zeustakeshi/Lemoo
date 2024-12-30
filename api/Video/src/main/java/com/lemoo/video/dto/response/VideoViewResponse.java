/*
 *  VideoViewResponse
 *  @author: Minhhieuano
 *  @created 12/18/2024 1:14 PM
 * */

package com.lemoo.video.dto.response;

import com.lemoo.video.entity.Product;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoViewResponse {
	private String id;
	private Set<String> tags;
	private String url;
	private Set<Product> products;
	private Long views;
	private ChannelFollowStatusResponse channel;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
