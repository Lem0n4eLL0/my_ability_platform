package com.example.authenticaton.model.dto.request;

import com.example.authenticaton.enums.AccountRole;

public record RegisterRequest(
    String email,
    String password,
    AccountRole role
) {

}
