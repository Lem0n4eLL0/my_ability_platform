package com.example.GigAnt.model.dto.response;

import java.util.UUID;

public record CertificateResponse(
    UUID id,
    String title,
    String link
) {
}