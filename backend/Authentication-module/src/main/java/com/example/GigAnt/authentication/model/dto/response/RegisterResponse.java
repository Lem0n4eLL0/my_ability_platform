package com.example.GigAnt.authentication.model.dto.response;

import com.example.GigAnt.authentication.enums.AccountRole;
import java.util.UUID;

public record RegisterResponse(
    UUID id,
    String email,
    AccountRole role

) {

}
