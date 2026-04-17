package com.example.GigAnt.authentication.model.dto.request;

public record RegisterRequest(
    String email,
    String password,
    boolean isAgreementAccepted
) {

}
