/*
 *  BaseVoucher
 *  @author: Minhhieuano
 *  @created 12/27/2024 11:29 AM
 * */


package com.lemoo.promotion.entity;

import com.lemoo.promotion.common.enums.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@CompoundIndexes(@CompoundIndex(unique = true, def = "{storeId: 1, name: 1}"))
public abstract class Voucher extends BaseEntity {
    private String name; // Title or description of the voucher

    @Indexed
    private String storeId;

    @Indexed
    @Builder.Default
    private VoucherStatus status = VoucherStatus.NOT_ACTIVE;

    @Setter(AccessLevel.PROTECTED)
    private VoucherType type; // Type of voucher, e.g., "follow_discount" or "new_customer"

    private VoucherTimeType voucherTimeType;

    @Indexed
    private LocalDateTime periodStartTime; // The period start time that customers can use the voucher

    @Indexed
    private LocalDateTime periodEndTime; // The period end time that customers can use the voucher
    private LocalDateTime collectionStartTime; // The time that customers can collect the voucher

    private VoucherScope scope; // Scope type: "entire_store" or "specific_products"

    @Indexed
    private DiscountType discountType;

    @Indexed
    private Long discountValue;

    private Long minimumOrderValue; // Discount details, if order value reaches criteria_over_money value, will discount money value
    private Long maximumDiscountValue; // Discount details, if order value reaches criteria_over_money value, allow maximum discount per order, just support percentage discount off type

    private Long totalAvailable;
    private Long limit; // Voucher limit per customer

}
