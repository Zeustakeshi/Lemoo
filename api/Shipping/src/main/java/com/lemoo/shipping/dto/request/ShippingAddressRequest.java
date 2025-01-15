/*
 *  ShippingAddressRequest
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:11 AM
 * */


package com.lemoo.shipping.dto.request;

import com.lemoo.shipping.common.enums.ShippingAddressType;
import com.lemoo.shipping.entity.Address;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ShippingAddressRequest {

    @NotEmpty
    @Size(min = 5, max = 50)
    private String recipientName;

    @Pattern(
            regexp = "^(0|\\+84)?(3[2-9]|5[689]|7[06-9]|8[1-68]|9\\d)\\d{7}$",
            message = "Invalid recipient phone number format.")
    @NotEmpty(message = "Recipient phone can't null or empty.")
    @Size(min = 5, max = 50)
    private String recipientPhone;

    @NotNull
    private Address address;

    @NotNull
    private ShippingAddressType type;
}
