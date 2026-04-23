package com.example.GigAnt.authentication.model.dto.request;

import com.example.GigAnt.authentication.enums.AccountRole;

public record RegisterRequest(
    String email,
    String password,
    AccountRole role,
    boolean isAgreementAccepted
) {

}
