/*
 *  Address
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:01 AM
 * */


package com.lemoo.shipping.entity;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @NotNull
    private BasePartialAddress province;

    @NotNull
    private BasePartialAddress district;

    @NotNull
    private BasePartialAddress ward;

    @NotNull
    private String detail;

    public String getFullAddress() {
        return ward.getName() + ", " + district.getName() + ", " + province.getName();
    }
}
