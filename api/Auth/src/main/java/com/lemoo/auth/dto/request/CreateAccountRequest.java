/*
 *  CreateAccountRequest
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:59 PM
 * */

package com.lemoo.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateAccountRequest {

    @Email(message = "Invalid email format.")
    @NotEmpty(message = "Email can't null or empty.")
    private String email;

    @NotEmpty(message = "Username can't null or empty.")
    @Size(min = 5, max = 50)
    private String username;

    @Pattern(
            regexp = "^(0|\\+84)?(3[2-9]|5[689]|7[06-9]|8[1-68]|9\\d)\\d{7}$",
            message = "Invalid phone number format.")
    @NotEmpty(message = "Phone can't null or empty.")
    @Size(min = 5, max = 50)
    private String phone;

    @NotEmpty(message = "Password can not be empty or null.")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
            message =
                    "Password must be at least 8 character, one numeric character, one special character, without space and including lowercase, uppercase character.")
    private String password;
}
