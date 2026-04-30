package com.example.GigAnt.model.dto.response;

import java.util.UUID;

public record ProjectResponse(
    UUID id,
    String title,
    String description,
    String link
) {
}