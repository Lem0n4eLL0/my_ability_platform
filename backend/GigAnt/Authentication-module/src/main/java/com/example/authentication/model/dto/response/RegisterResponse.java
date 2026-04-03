package com.example.authentication.model.dto.response;

import com.example.authentication.enums.AccountRole;
import java.util.UUID;

public record RegisterResponse(
    UUID id,
    String email,
    AccountRole role

) {

}
