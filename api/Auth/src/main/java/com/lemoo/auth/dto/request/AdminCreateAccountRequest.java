/*
 *  AdminCreateAccountRequest
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:37 AM
 * */


package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminCreateAccountRequest {

    @NotEmpty
    @Email
    @Size(min = 5, max = 30)
    private String email;

    @NotEmpty
    @Size(min = 8, max = 100)
    @NotEmpty(message = "Password can not be empty or null.")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
            message =
                    "Password must be at least 8 character, one numeric character, one special character, without space and including lowercase, uppercase character.")
    private String password;
}
