/*
 *  OtpResponse
 *  @author: Minhhieuano
 *  @created 10/15/2024 11:08 PM
 * */

package com.lemoo.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OtpResponse {
    private String code;
}
