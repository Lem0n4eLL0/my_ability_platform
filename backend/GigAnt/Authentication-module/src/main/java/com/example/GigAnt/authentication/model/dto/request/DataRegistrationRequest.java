package com.example.GigAnt.authentication.model.dto.request;

public record DataRegistrationRequest(
    String firstName,
    String lastName,
    String surname,
    String birthday
) {

}
