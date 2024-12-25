/*
 *  AccountCreationOtpEvnt
 *  @author: Minhhieuano
 *  @created 12/25/2024 12:52 PM
 * */


package com.lemoo.notification.event.eventModel;


import lombok.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class AccountCreationOtpEvent extends Event {

    private String username;
    private String email;
    private String otp;

    @Override
    protected void setGroupId(String groupId) {
        this.groupId = "E_012";
    }
}
