/*
 *  PendingStore
 *  @author: Minhhieuano
 *  @created 1/28/2025 4:06 PM
 * */


package com.lemoo.admin.entity;

import com.lemoo.admin.common.enums.StoreStatus;
import com.lemoo.admin.common.enums.StoreType;
import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(indexes = {
        @Index(columnList = "storeId"),
        @Index(columnList = "shortCode"),
})
public class Store extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String storeId;

    @Column(unique = true, nullable = false)
    private String shortCode;

    @Column(unique = true, nullable = false)
    private String accountId;

    @Enumerated(EnumType.STRING)
    private StoreStatus status;

    @Column(nullable = false)
    private StoreType type;

    @Column(nullable = false)
    private String name;

    private String storeEmail;

}
