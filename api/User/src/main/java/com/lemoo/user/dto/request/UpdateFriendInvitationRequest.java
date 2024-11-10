package com.lemoo.user.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UpdateFriendInvitationRequest {

    @NotEmpty
    private String requestId;

}
