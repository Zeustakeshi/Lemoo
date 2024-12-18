/*
 *  MediaType
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:39 PM
 * */

package com.lemoo.product.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MediaType {
	IMAGE(1),
	VIDEO(2),
	;

	private final int value;

	MediaType(int value) {
		this.value = value;
	}

	@JsonCreator
	public static MediaType fromValue(int value) {
		for (MediaType imageType : MediaType.values()) {
			if (imageType.value == value) {
				return imageType;
			}
		}
		throw new IllegalArgumentException("Invalid value for MediaType: " + value);
	}

	@JsonValue
	public int getValue() {
		return value;
	}
}
