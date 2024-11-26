/*
 *  Store
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:20 PM
 * */


package com.lemoo.store.entity;

import jakarta.persistence.Entity;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Store extends BaseEntity {
    private String name;
    private String avatar;
    private String phone;
    private String email;
    private String ownerId;

}
