/*
 *  BaseEntity
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:11 PM
 * */

package com.lemoo.notification.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@SuperBuilder
@Data
@NoArgsConstructor
public abstract class BaseEntity {
    @Id
    private String id;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
