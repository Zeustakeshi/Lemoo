/*
 *  Event
 *  @author: Minhhieuano
 *  @created 12/10/2024 8:39 PM
 * */

package com.lemoo.shipping.event.model;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
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

    @Builder.Default
    private String id = NanoIdUtils.randomNanoId();

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

}
