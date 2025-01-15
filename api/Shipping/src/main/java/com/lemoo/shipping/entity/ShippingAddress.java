/*
 *  ShippingAddress
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:04 AM
 * */


package com.lemoo.shipping.entity;

import com.lemoo.shipping.common.enums.ShippingAddressType;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShippingAddress extends BaseEntity {
    private String userId;
    private Boolean isDefault;
    private String recipientName;
    private String recipientPhone;
    private Address address;
    private ShippingAddressType type;
}
