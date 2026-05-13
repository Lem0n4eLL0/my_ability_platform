package com.example.GigAnt.model.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
@Builder
public record TestResultResponse(
        int score,
        Integer estimationProcent,
        boolean isTestPassed,
        LocalDateTime reconfirmationDate,
        LocalDateTime completionDate

) {
}
