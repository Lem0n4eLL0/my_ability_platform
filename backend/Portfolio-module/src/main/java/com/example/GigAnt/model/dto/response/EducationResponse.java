package com.example.GigAnt.model.dto.response;

import com.example.GigAnt.model.enums.EducationStatus;
import java.util.UUID;

public record EducationResponse(
    UUID id,
    String city,
    String university,
    String faculty,
    String specialization,
    EducationStatus status,
    String graduationDate
) {
}