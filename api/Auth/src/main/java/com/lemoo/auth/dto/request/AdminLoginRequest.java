/*
 *  AdminAuthRequest
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:36 AM
 * */


package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminLoginRequest {
    @NotEmpty
    private String email;

    @NotEmpty
    @Size(min = 8)
    private String password;
}
