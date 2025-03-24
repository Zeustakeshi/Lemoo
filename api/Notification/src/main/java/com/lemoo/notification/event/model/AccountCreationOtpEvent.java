/*
 *  AccountCreationOtpEvnt
 *  @author: Minhhieuano
 *  @created 12/25/2024 12:52 PM
 * */

package com.lemoo.notification.event.model;

import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AccountCreationOtpEvent extends Event {

    private String email;
    private String otp;


}
