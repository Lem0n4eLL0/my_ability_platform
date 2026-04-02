package com.example.authenticaton.model.dto.response;

import com.example.authenticaton.enums.AccountRole;
import java.util.UUID;

public record RegisterResponse(
    UUID id,
    String email,
    AccountRole role

) {

}
