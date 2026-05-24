package com.example.GigAnt.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record TestResultResponse(
        UUID id,
        int score,
        Integer estimationProcent,
        boolean passingTest,
        LocalDateTime reconfirmationDate,
        LocalDateTime completionDate

) {
}
