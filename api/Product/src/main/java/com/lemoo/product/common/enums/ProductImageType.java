/*
 *  ProductImageType
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:44 PM
 * */

package com.lemoo.product.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProductImageType {
	SMALL(1),
	PRODUCT(2),
	VARIANT(3);
	private final int value;

	ProductImageType(int value) {
		this.value = value;
	}

	@JsonCreator
	public static ProductImageType fromValue(int value) {
		for (ProductImageType imageType : ProductImageType.values()) {
			if (imageType.value == value) {
				return imageType;
			}
		}
		throw new IllegalArgumentException("Invalid value for ImageType: " + value);
	}

	@JsonValue
	public int getValue() {
		return value;
	}
}
