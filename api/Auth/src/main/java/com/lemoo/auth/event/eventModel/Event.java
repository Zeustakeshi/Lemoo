/*
 *  Event
 *  @author: Minhhieuano
 *  @created 9/27/2024 9:19 PM
 * */

package com.lemoo.auth.event.eventModel;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class Event {

    @NotNull
    protected String groupId;

    @Builder.Default
    private String id = NanoIdUtils.randomNanoId();

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    protected abstract void setGroupId(String groupId);
}
