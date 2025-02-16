/*
 *  Message
 *  @author: Minhhieuano
 *  @created 2/6/2025 1:13 AM
 * */

package com.lemoo.chat.entity;

import com.lemoo.chat.common.enums.RoomType;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public abstract class Room extends BaseEntity {
	private Set<String> members;
	private String lastMessage;
	private String name;
	private String avatar;
	private RoomType type;
}
