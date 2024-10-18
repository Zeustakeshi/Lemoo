/*
 *  Otp
 *  @author: Minhhieuano
 *  @created 10/18/2024 3:48 PM
 * */


package com.lemoo.auth.domain;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.auth.common.enums.OtpType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Builder
@Data
public class Otp {
    @Builder.Default
    @Setter(AccessLevel.PRIVATE)
    private String code = NanoIdUtils.randomNanoId();
    private String value;
    private OtpType type;

    @Builder.Default
    private Integer resendCount = 0;
}
