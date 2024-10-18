/*
 *  ResendOtpRequest
 *  @author: Minhhieuano
 *  @created 10/18/2024 6:32 PM
 * */


package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ResendOtpRequest {
    @NotEmpty
    private String code;
}
