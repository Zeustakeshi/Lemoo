/*
 *  Message
 *  @author: Minhhieuano
 *  @created 2/6/2025 1:13 AM
 * */


package com.lemoo.chat.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
public class Room extends BaseEntity {
    private Set<String> members;
    private String lastMessage;
    private String ownerId;
}
