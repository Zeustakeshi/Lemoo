/*
 *  Message
 *  @author: Minhhieuano
 *  @created 2/6/2025 1:13 AM
 * */

package com.lemoo.chat.entity;

import com.lemoo.chat.common.enums.MessageStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
public class Message extends BaseEntity {
    private String senderId;
    private String roomId;
    private String text;
    private MessageStatus status;

    @Builder.Default
    private Set<String> viewers = new HashSet<>();
}
