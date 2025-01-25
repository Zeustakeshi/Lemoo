/*
 *  InitCartEvent
 *  @author: Minhhieuano
 *  @created 1/25/2025 11:43 PM
 * */


package com.lemoo.order.event.eventModel;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class InitCartEvent extends Event {
    private String userId;
}
