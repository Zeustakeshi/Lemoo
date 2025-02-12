/*
 *  Message
 *  @author: Minhhieuano
 *  @created 2/6/2025 1:13 AM
 * */

package com.lemoo.chat.entity;

import com.lemoo.chat.common.enums.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

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
}
