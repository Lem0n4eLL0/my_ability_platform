package com.example.GigAnt.model.dto.response;

import java.util.UUID;

public record WorkExperienceResponse(
    UUID id,
    String city,
    String company,
    String yearStart,
    String yearEnd,
    String post
) {
}