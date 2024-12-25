/*
 *  Event
 *  @author: Minhhieuano
 *  @created 12/10/2024 8:39 PM
 * */

package com.lemoo.store.event.eventModel;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class Event {

	@NotNull protected String groupId;

	@Builder.Default
	private String id = NanoIdUtils.randomNanoId();

	@Builder.Default
	private LocalDateTime timestamp = LocalDateTime.now();

	protected abstract void setGroupId(String groupId);
}
