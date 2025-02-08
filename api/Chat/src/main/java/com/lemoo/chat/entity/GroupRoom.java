/*
 *  GroupRoom
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:36 PM
 * */

package com.lemoo.chat.entity;

import com.lemoo.chat.common.enums.RoomType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@SuperBuilder
@Data
public class GroupRoom extends Room {

	private String owner;

	public GroupRoom() {
		setType(RoomType.GROUP);
	}
}
