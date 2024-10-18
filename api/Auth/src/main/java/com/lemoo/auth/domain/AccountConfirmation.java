/*
 *  AccountConfirmation
 *  @author: Minhhieuano
 *  @created 10/18/2024 4:34 PM
 * */


package com.lemoo.auth.domain;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class AccountConfirmation extends AccountOtpInformation {
    private String email;
    private String password;
    private String username;
    private String phone;
    private String otpCode;
    private int resendCount;
}
