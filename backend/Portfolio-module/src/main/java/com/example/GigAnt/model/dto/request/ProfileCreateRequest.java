package com.example.GigAnt.model.dto.request;

public record ProfileCreateRequest(
    String firstName,
    String lastName,
    String surname,
    String birthday
) {

}
