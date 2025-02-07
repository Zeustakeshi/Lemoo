/*
 *  SingleRoom
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:35 PM
 * */

package com.lemoo.chat.entity;

import com.lemoo.chat.common.enums.RoomType;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@SuperBuilder
@Data
public class SingleRoom extends Room {

	@Builder.Default
	private boolean isSA = false; // seller account

	public SingleRoom() {
		setType(RoomType.SINGLE);
	}
}
