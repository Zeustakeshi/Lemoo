/*
 *  ResourceUploaderResponse
 *  @author: Minhhieuano
 *  @created 12/10/2024 2:12 PM
 * */

package com.lemoo.media.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResourceUploaderResponse {
	private String publicId;
	private Long version;
	private String signature;
	private Long width;
	private Long height;
	private String format;
	private String resourceType;
	private String url;
	private String secureUrl;
	private String etag;
}
