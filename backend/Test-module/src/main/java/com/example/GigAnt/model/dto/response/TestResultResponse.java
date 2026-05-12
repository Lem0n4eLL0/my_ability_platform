package com.example.GigAnt.model.dto.response;

import java.time.LocalDateTime;

public record TestResultResponse(
        Integer estimationProcent,
        boolean isTestPassed,
        LocalDateTime reconfirmationDate,
        LocalDateTime completionDate

) {
}
