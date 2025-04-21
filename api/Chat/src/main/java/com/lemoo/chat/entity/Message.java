/*
 *  Message
 *  @author: Minhhieuano
 *  @created 2/6/2025 1:13 AM
 * */

package com.lemoo.chat.entity;

import com.lemoo.chat.common.enums.MessageStatus;
import com.lemoo.chat.common.enums.MessageType;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
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
    private MessageType type = MessageType.TEXT;

    @Builder.Default
    private Map<String, String> payload = new HashMap<>();

    @Builder.Default
    private Set<String> viewers = new HashSet<>();
}
